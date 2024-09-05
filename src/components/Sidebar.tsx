"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { LucideTrash } from "lucide-react";
import starter from "@/fakeData/starterResumeLink.json";
import { useInfo } from "@/context/InfoContext";
import { cn } from "@/lib/utils";
import { ResumeLink } from "@/fakeData/personal";

export default function Sidebar() {
  const { links, setLinks } = useInfo();
  const router = useRouter();
  const resumeId = useParams().resumeId as string | undefined;

  const addLink = () => {
    const newLink:ResumeLink = {
      jobTitle: "Untitled Listing",
      id: uuidv4(),
      date: new Date(),
      jobSiteLink: "",
      jobSiteChoice: "linkedIn",
      scrapedData: {
        jobTitle: "",
        companyName: "",
        locationAndTime: "",
        jobDescription: "",
        salary: "",
      },
      resume: starter,
      matchScore: "",
      overallThoughts: "",
      strengths: "",
      weaknesses: "",
    };

    console.log(links);

    setLinks([...links, newLink]);
    router.push(`/resume/${newLink.id}?tab=details`);
  };

  const removeLink = (id: string) => {
    const updatedLinks = links.filter((link) => link.id !== id);
    setLinks(updatedLinks);
  };

  return (
    <div className="w-[240px] h-full flex flex-col overflow-auto p-6 shrink-0 bg-blue-50 shadow-md">
      <h2 className="text-2xl font-bold text-blue-800">History</h2>

      <div className="mt-6">
        <Button
          onClick={addLink}
          className="mb-4 w-full bg-blue-600 text-white hover:bg-blue-700"
        >
          Add Job Listing
        </Button>

        <ul className="space-y-2">
          {links.map((link) => (
            <li
              key={link.id}
              className="flex justify-between items-center bg-white p-2 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <Link
                href={`/resume/${link.id}?tab=details`}
                className={cn(
                  "",
                  resumeId === link.id
                    ? "font-semibold text-blue-600"
                    : "text-neutral-600 hover:text-blue-600"
                )}
              >
                {link.jobTitle}
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-red-600 shrink-0"
                onClick={() => removeLink(link.id)}
              >
                <LucideTrash size={16} />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
