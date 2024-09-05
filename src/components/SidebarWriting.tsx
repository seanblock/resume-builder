"use client";
import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useWritingForm } from "@/context/WritingContext";
import { Label } from "./ui/label";

export default function SidebarWriting() {
  const { writingSettings, setWritingSettings } = useWritingForm();

  const updateWritingSettings = (key: string, value: string) => {
    setWritingSettings({
      ...writingSettings,
      [key]: value,
    });
  };

  return (
    <div className="w-[240px] h-full flex flex-col overflow-auto p-6 shrink-0 bg-blue-50 shadow-md">
      <h2 className="text-2xl font-bold text-blue-800">Settings</h2>
      <div className="mt-6 space-y-6">
        <div>
          <Label>Writing Style</Label>
          <Select
            value={writingSettings.writingStyle}
            onValueChange={(value) =>
              updateWritingSettings("writingStyle", value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Writing Style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="">Writing Material</Label>
          <Select
            value={writingSettings.writingMaterial}
            onValueChange={(value) =>
              updateWritingSettings("writingMaterial", value)
            }
          >
            <SelectTrigger className="w-full mt-0">
              <SelectValue placeholder="Select Writing Material" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paper">Paper</SelectItem>
              <SelectItem value="article">Article</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="chat">Chat</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Paragraph Format</Label>
          <Select
            value={writingSettings.paragraphFormat}
            onValueChange={(value) =>
              updateWritingSettings("paragraphFormat", value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Paragraph Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="essay">Essay</SelectItem>
              <SelectItem value="letter">Letter</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Max Characters</Label>
          <Input
            type="number"
            value={writingSettings.maxCharacters || ""}
            placeholder="e.g., 2000"
            onChange={(e) =>
              updateWritingSettings("maxCharacters", e.target.value)
            }
          />
        </div>

        <div>
          <Label>Min Characters</Label>
          <Input
            type="number"
            value={writingSettings.minCharacters || ""}
            placeholder="e.g., 100"
            onChange={(e) =>
              updateWritingSettings("minCharacters", e.target.value)
            }
          />
        </div>

        <div>
          <Label>Grammar Level</Label>
          <Select
            value={writingSettings.grammarLevel}
            onValueChange={(value) =>
              updateWritingSettings("grammarLevel", value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Grammar Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
