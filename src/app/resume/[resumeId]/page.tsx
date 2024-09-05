"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Details from "./Details";
import Resume from "./Resume";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResumePage({
  params: { resumeId },
}: {
  params: {
    resumeId: string;
  };
}) {

  const tab = useSearchParams().get("tab") || "details";
  const { push } = useRouter();

  return (
    <div className="p-6">
      <h4 className="text-2xl font-bold">Resume</h4>

      <Tabs defaultValue={tab} className="mt-4">
        <TabsList>
          <TabsTrigger 
            value="details"
            onClick={() => {
              push(`/resume/${resumeId}?tab=details`);
            }}
          >Details</TabsTrigger>
          <TabsTrigger 
            value="resume"
            onClick={() => {
              push(`/resume/${resumeId}?tab=resume`);
            }}
          >Resume</TabsTrigger>
        </TabsList>

        <Details />
        <Resume />
        
      </Tabs>
    </div>
  );
}
