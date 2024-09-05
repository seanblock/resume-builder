import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { z } from "zod";
import { openai } from "@ai-sdk/openai";

const textAnalysisSchema = z.object({
  writingSample: z.string().min(1, "Text is required"),
});

export async function POST(req: NextRequest) {
  try {
    const { writingSample }: { writingSample: string } = await req.json();
    console.log("writingSample:", writingSample);
    const parsedText = textAnalysisSchema.parse({ writingSample });

    const analysisPrompt = `
      Analyze the following text for its writing style, focusing on structure, grammar, tone, and stylistic characteristics. 
      Without introducing the prompt with phrases like 'To replicate the writing style of the provided samples,' 
      generate a concise AI prompt that captures the writer's style and provides guidance for replicating it.

      The AI prompt should only include direct instructions on how to mimic the writing style, without any introductory statements.

      Provide the AI prompt in plain text, limited to two paragraphs.

      Writing Sample: ${parsedText.writingSample}
    `;

    const analysisResult = await generateText({
      model: openai("gpt-4o"),
      prompt: analysisPrompt,
    });

    const analysis = analysisResult.text.trim();

    return NextResponse.json(
      {
        writingStylePrompt: analysis,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in writing style analysis API:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Error generating writing style prompt" },
      { status: 500 }
    );
  }
}
