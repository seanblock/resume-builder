"use client";
import { ResumeLink } from "@/fakeData/personal";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useInfo } from "./InfoContext";
import starter from "@/fakeData/starterResumeLink.json";

interface ResumeContextType {
  link: ResumeLink;
  setLink: React.Dispatch<React.SetStateAction<ResumeLink>>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({
  children,
  resumeId,
}: {
  children: React.ReactNode;
  resumeId: string;
}) => {
  const { links, setLinks } = useInfo();
  const [link, setLink] = useState<ResumeLink>(
    links.find((link) => link.id === resumeId) || {
      jobTitle: "Untitled Listing",
      id: resumeId,
      date: new Date(),
      resume: starter,
      jobSiteLink: "",
      jobSiteChoice: "linkedIn",
      scrapedData: {
        jobTitle: "",
        companyName: "",
        locationAndTime: "",
        jobDescription: "",
        salary: "",
      },
      matchScore: "",
      overallThoughts: "",
      strengths: "",
      weaknesses: "",
    }
  );

  // Update the links when link is updated
  useEffect(() => {
    setLinks((prevLinks) =>
      prevLinks.map((existingLink) =>
        existingLink.id === resumeId
          ? { ...existingLink, ...link }
          : existingLink
      )
    );
  }, [link, resumeId, setLinks]);

  return (
    <ResumeContext.Provider value={{ link, setLink }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
