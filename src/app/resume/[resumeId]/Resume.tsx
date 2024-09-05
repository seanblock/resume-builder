"use client";
import React, { useEffect, useState } from "react";
import Address from "@/app/setup/Address";
import Certificates from "@/app/setup/Certificates";
import Contact from "@/app/setup/Contact";
import Education from "@/app/setup/Education";
import Experience from "@/app/setup/Experience";
import Personal from "@/app/setup/Personal";
import Projects from "@/app/setup/Projects";
import Skills from "@/app/setup/Skills";
import { TabsContent } from "@/components/ui/tabs";
import { useResume } from "@/context/ResumeContext";
import { ResumeType } from "@/fakeData/personal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useInfo } from "@/context/InfoContext";
import DownloadResume from "@/components/resume/DownloadResume";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

export default function Resume() {
  const { link, setLink } = useResume();
  const { personal: currentResume } = useInfo();
  const resume = link.resume;
  const [isGenerating, setIsGenerating] = useState(false);

  const [prompt, setPrompt] = useState("");

  // Get Prompt from localstorage if it exists.
  useEffect(() => {
    const prompt = localStorage.getItem("globalPrompt");
    console.log("prompt: ", prompt);
    if (prompt) {
      setPrompt(prompt);
    }
  }, []);

  if (!link) {
    return <div>Resume not found</div>;
  }

  const setResume = (newInfo: React.SetStateAction<ResumeType>) => {
    setLink((prevLink) => ({
      ...prevLink,
      resume:
        typeof newInfo === "function" ? newInfo(prevLink.resume) : newInfo,
    }));
  };

  const generateResume = async () => {
    setIsGenerating(true);
    console.log(currentResume);
    try {
      const results = await axios.post("/api/resumeCreate", {
        currentResume: currentResume.resume,
        jobDescription: link.scrapedData.jobDescription,
        prompt: prompt,
      });

      const {
        updatedResume,
        matchScore,
        overallThoughts,
        strengths,
        weaknesses,
      } = results.data;

      console.log(results.data);
      setLink((prevLink) => ({
        ...prevLink,
        resume: updatedResume,
        matchScore: matchScore,
        overallThoughts: overallThoughts,
        strengths: strengths,
        weaknesses: weaknesses,
      }));
      toast("Generated Resume", {
        position: "top-right",
      });
      console.log(results);
    } catch (error: any) {
      toast(error.message, {
        description: error.response.data.error,
        position: "top-right",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const matchScoreColor = (matchScore: string) => {
    const score = parseFloat(matchScore);
    if (score >= 80) {
      return "text-green-500";
    } else if (score >= 70) {
      return "text-yellow-500";
    } else if (score >= 60) {
      return "text-orange-500";
    } else {
      return "text-red-500";
    }
  }

  return (
    <TabsContent value="resume">
      <div className="my-10">
        <div className="flex-row flex items-center justify-between">
          <h1 className="text-xl font-semibold">Generate Resume</h1>
          <DownloadResume resume={link.resume} />
        </div>
        <Button onClick={generateResume} disabled={isGenerating} className="">
          {isGenerating ? "Generating..." : "Generate Resume"}
        </Button>
        {link.matchScore && (
          <div className="mt-10">
            <h2 className={cn("text-lg font-semibold", matchScoreColor(link.matchScore))}>
              Match Score: {link.matchScore}
            </h2>
            <ReactMarkdown className="text-md">
              {link.overallThoughts}
            </ReactMarkdown>
          </div>
        )}

        {link.strengths && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold">Strengths</h2>
            <ReactMarkdown className="text-md">{link.strengths}</ReactMarkdown>
          </div>
        )}

        {link.weaknesses && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold">Weaknesses</h2>
            <ReactMarkdown className="text-md">{link.weaknesses}</ReactMarkdown>
          </div>
        )}
      </div>

      {link && (
        <div className="flex flex-col gap-20">
          <Personal resume={resume} setResume={setResume} />
          <Contact resume={resume} setResume={setResume} />
          <Address resume={resume} setResume={setResume} />
          <Skills resume={resume} setResume={setResume} />
          <Experience resume={resume} setResume={setResume} />
          <Education resume={resume} setResume={setResume} />
          <Certificates resume={resume} setResume={setResume} />
          <Projects resume={resume} setResume={setResume} />
        </div>
      )}
    </TabsContent>
  );
}
