"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useInfo } from "@/context/InfoContext";
import axios from "axios";

export default function WritingPage() {
  const { personal, setPersonal } = useInfo();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/analyzeWriting", {
        writingSample: text,
      });

      if (response.status === 200) {
        const result = response.data;
        const updatedWriting = {
          ...personal.writing,
          writingStyle: result.writingStylePrompt,
        };

        setPersonal((prev) => ({
          ...prev,
          writing: updatedWriting,
        }));

      } else {
        console.error("Failed to analyze text");
      }
    } catch (error) {
      console.error("Error analyzing text:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Analyze My Writing Style
      </h1>
      <Textarea
        rows={10}
        placeholder="Paste your text here..."
        className="w-full max-w-3xl p-4 border border-gray-300 rounded-lg text-lg text-gray-700"
        value={text}
        onChange={handleChange}
      />
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
      {personal.writing.writingStyle && (
        <div className="mt-6 p-4 w-full max-w-3xl bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Your Writing Style</h2>
          <p className="text-gray-700">{personal.writing.writingStyle}</p>
        </div>
      )}
    </div>
  );
}
