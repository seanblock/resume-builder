import { NextRequest, NextResponse } from "next/server";
import { generateObject, generateText } from "ai";
import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { ResumeType } from "@/fakeData/personal";

const resumeSchema = z.object({
  experience: z.array(
    z.object({
      title: z.string(),
      company: z.string(),
      location: z.string().nullable(),
      start: z.string().nullable(),
      end: z.string().nullable(),
      bullets: z.array(z.string()),
      summary: z.string().nullable(),
      current: z.boolean(),
    })
  ),
  skills: z.array(z.string()),
});

export async function POST(req: NextRequest) {
  try {
    const {
      currentResume,
      jobDescription,
      prompt,
    }: { currentResume: ResumeType; jobDescription: string; prompt: string } =
      await req.json();

    if (!currentResume || !jobDescription) {
      console.log("Missing required fields:", {
        currentResume,
        jobDescription,
      });
      return NextResponse.json(
        { error: "Missing required fields: currentResume or jobDescription" },
        { status: 400 }
      );
    }

    const skills = currentResume.skills.join(", ");
    // const experiences = currentResume.experience.map((exp) => {
    //   return `
    //     ${exp.title} at ${exp.company} from ${exp.start} to ${exp.end}
    //     ${exp.bullets.join(", ")}
    //   `;
    // });

    const additionalPrompt = `
      Here is my current resume:
      ${JSON.stringify(currentResume)}
    
      Here are my current skills:
      ${skills}
    
      The job description of the job I'm applying for:
      ${jobDescription}
    `;

    const updatedPrompt = additionalPrompt + ". " + prompt;

    console.log("updatedPrompt: ", updatedPrompt);

    const { object: updatedResume } = await generateObject({
      model: openai("gpt-4o"),
      schema: resumeSchema,
      prompt: updatedPrompt,
    });

    // Ensure the `current` field is correctly defined
    updatedResume.experience = updatedResume.experience.map((exp, index) => ({
      ...exp,
      title: currentResume.experience[index].title,
      company: currentResume.experience[index].company,
      start: currentResume.experience[index].start
        ? new Date(currentResume.experience[index].start).toISOString()
        : null,
      end: currentResume.experience[index].end
        ? new Date(currentResume.experience[index].end).toISOString()
        : null,
      summary: exp.summary !== undefined && exp.summary !== null ? exp.summary : "",
      current:
        exp.current !== undefined && exp.current !== null
          ? exp.current
          : currentResume.experience[index].end === null,
    }));

    const parsedResume = resumeSchema.parse(updatedResume);
    console.log("Generated updated resume");

    const updatedResumeFinal = {
      ...currentResume,
      experience: parsedResume.experience,
      skills: parsedResume.skills,
    };

    // Generate a match score and summary
    const matchPrompt = `
      Based on the following resume and job description.
      Please provide a match score from 0 to 100, where 100 indicates a perfect match. Be honest on match score, it should be based on the job description and position. 

      Break down stengths and weaknesses into bullet points based on the resume requirements and the job description.  Use markdown.  Include the requirement from the job description.  For example:
        Required 5 years experience in React: Experience with React for 3 years
        Experience in FERPA: No experience with FERPA

      *** Important *** Only use the strengths and weaknesses that are directly specified to the job description.  Be as brutally honest as possible for match score and for strengths and weaknesses.

      Resume: ${JSON.stringify(updatedResumeFinal)}
      Job Description: ${jobDescription}
    `;

    const matchAnalysisResult = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        strengths: z.string(),
        weaknesses: z.string(),
        overallThoughts: z.string(),
        matchScore: z.number().int().min(0).max(100),
      }),
      prompt: matchPrompt,
    });

    const { strengths, weaknesses, matchScore, overallThoughts } = matchAnalysisResult.object;

    // Access the actual text result
    // const matchAnalysis = matchAnalysisResult.text;

    // const matchScoreRegex = /Match Score: (\d+)/i;
    // const matchScoreMatch = matchAnalysis.match(matchScoreRegex);
    // const matchScore = matchScoreMatch ? parseInt(matchScoreMatch[1]) : null;

    // const matchSummary = matchAnalysis.replace(matchScoreRegex, "").trim();

    // console.log("Match Score:", matchScore);
    // console.log("Match Summary:", matchSummary);

    return NextResponse.json(
      {
        strengths,
        updatedResume: updatedResumeFinal,
        matchScore,
        overallThoughts,
        weaknesses,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in API route:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Error generating updated resume" },
      { status: 500 }
    );
  }
}
