"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function PromptSetupPage() {
  const defaultPrompt = `Your task is to analyze the experience section of my resume and create bullet points to better align with the job description provided below. The bullet points should retain the essence of my original experience but be written or expanded to more effectively showcase my responsibilities, achievements, and skills relevant to the job. Additionally, please update the skills section to ensure it reflects the most important and relevant skills based on the improved bullet points.

  **Important:** Please limit the number of bullet points to a maximum of 7 per experience. If my original bullet points exceed this number, prioritize the most impactful contributions and remove/consolidate less important bullet points. The revised bullet points should focus on the most significant aspects of my experience as they relate to the job description.

  Following guidelines:

- Start each bullet point with a strong action verb.
- Quantify achievements wherever possible to demonstrate impact (examples: Promoted club membership sign-ups at in-person and virtual events to increase annual membership by 15%. Led training of new employees at smooth and sandwich prep stations to reinforce food handling and safety guidelines. Oversaw the management of 1,000 students.) 
- Highlight the results and impact of my work, not just the tasks performed.
- Include relevant keywords and skills from the job description provided below.
- Be specific and concise, limiting bullet points to 1-2 lines.
- Follow the PAR (Problem, Action, Result) method where applicable to illustrate challenges faced, actions taken, and results achieved.
- Ensure the bullet points are clear, consistent, and impactful.
- Add any missing skills or achievements that may be relevant from my experience.
- Update the skills section to include any new skills highlighted in the revised bullet points and ensure alignment with the job description. If you find any non-capitalized skills fix it. `;

  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const savedPrompt = localStorage.getItem("globalPrompt");
    if (savedPrompt) {
      setPrompt(savedPrompt);
    } else {
      setPrompt(defaultPrompt);
    }
  }, [defaultPrompt]);

  const savePromptToLocalStorage = useCallback((value: string) => {
    localStorage.setItem("globalPrompt", value);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    debounce((value: string) => savePromptToLocalStorage(value), 500),
    [savePromptToLocalStorage]
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newPrompt = e.target.value;
    setPrompt(newPrompt);
    debouncedSave(newPrompt);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Setup Your Prompt
      </h1>
      <Textarea
        rows={20}
        placeholder="Write your prompt here..."
        className="w-full max-w-3xl p-4 border border-gray-300 rounded-lg text-lg text-gray-700"
        value={prompt}
        onChange={handleChange}
      />
      <p className="mt-6 text-gray-500 text-center max-w-3xl">
        The job description and your resume will automatically be included in
        the prompt.
      </p>
    </div>
  );
}

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
