"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TabsContent } from "@/components/ui/tabs";
import { useResume } from "@/context/ResumeContext";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { LucideLoader } from "lucide-react";
import { ResumeLink } from "@/fakeData/personal";
import { useInfo } from "@/context/InfoContext";

const websites = [
  { name: "LinkedIn", value: "linkedIn" },
  { name: "Custom", value: "custom" },
];

export default function Details() {
  const { link, setLink } = useResume();
  const { links, setLinks } = useInfo();
  const [loading, setLoading] = useState(false);

  const handleScanJobPosting = async () => {
    if (link?.jobSiteChoice === "custom") return;

    setLoading(true);
    try {
      const response = await axios.post("/api/scrapeJob", {
        jobSiteLink: link?.jobSiteLink,
      });
      const { jobTitle, companyName, locationAndTime, salary, jobDescription } =
        response.data;

      const updatedLink = {
        ...link,
        scrapedData: {
          jobTitle,
          companyName,
          locationAndTime,
          salary,
          jobDescription,
        },
        jobTitle: jobTitle || link?.jobTitle,
      };

      setLink(updatedLink);
      updateLinksInLocalStorage(updatedLink);
    } catch (error) {
      console.error("Error scanning job posting:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateLinksInLocalStorage = (updatedLink: ResumeLink) => {
    const updatedLinks = links.map((l) =>
      l.id === updatedLink.id ? updatedLink : l
    );
    setLinks(updatedLinks);
    localStorage.setItem("resumeLinks", JSON.stringify(updatedLinks));
  };

  return (
    <TabsContent value="details">
      <p className="mt-4">
        {link
          ? `You are editing the resume for ${link.jobTitle}`
          : "No resume found"}
      </p>

      {/* Job Title */}
      <Label htmlFor="jobTitle" className="mt-6 text-lg font-semibold">
        Job Title
      </Label>
      <Input
        id="jobTitle"
        type="text"
        placeholder="Enter Job Title"
        className="border p-2 max-w-sm mt-2"
        value={link?.jobTitle || ""}
        onChange={(e) => {
          const updatedLink = { ...link, jobTitle: e.target.value };
          setLink(updatedLink);
          updateLinksInLocalStorage(updatedLink);
        }}
      />

      {/* Radio Buttons for Job Site */}
      <div className="mt-10">
        <div className="text-lg font-bold mb-6">Job Site Choice</div>
        <RadioGroup
          name="jobSiteChoice"
          value={link?.jobSiteChoice || "linkedIn"}
          onValueChange={(value) => {
            const updatedLink = { ...link, jobSiteChoice: value as "linkedIn" | "custom" };
            setLink(updatedLink);
            updateLinksInLocalStorage(updatedLink);
          }}
          className="grid grid-cols-8 gap-4 mb-6"
        >
          {websites.map((website) => (
            <div key={website.value} className="flex items-center space-x-2">
              <RadioGroupItem value={website.value} id={website.value} />
              <Label htmlFor={website.value}>{website.name}</Label>
            </div>
          ))}
        </RadioGroup>

        {link?.jobSiteChoice === "linkedIn" && (
          <>
            <Label htmlFor="jobSiteLink" className="mt-4">
              LinkedIn Job Posting Link
            </Label>
            <Input
              type="text"
              placeholder="Enter LinkedIn Job Posting Link"
              className="border p-2 w-full max-w-2xl mt-2"
              value={link?.jobSiteLink || ""}
              onChange={(e) => {
                const updatedLink = { ...link, jobSiteLink: e.target.value };
                setLink(updatedLink);
                updateLinksInLocalStorage(updatedLink);
              }}
            />

            <Button
              className="mt-6 bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleScanJobPosting}
              disabled={loading}
            >
              {loading ? (
                <div className="flex gap-2 items-center">
                  <LucideLoader className="animate-spin mr-2" size={16} /> Getting
                  Job Posting
                </div>
              ) : (
                "Scan Job Posting"
              )}
            </Button>

            {/* Display the scraped data */}
            {link?.scrapedData && !loading && (
              <div className="mt-10 bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Scraped Job Details</h3>
                {link.scrapedData.jobTitle && (
                  <p>
                    <strong>Job Title:</strong> {link.scrapedData.jobTitle}
                  </p>
                )}
                {link.scrapedData.companyName && (
                  <p>
                    <strong>Company Name:</strong> {link.scrapedData.companyName}
                  </p>
                )}
                {link.scrapedData.locationAndTime && (
                  <p>
                    <strong>Location:</strong> {link.scrapedData.locationAndTime}
                  </p>
                )}
                {link.scrapedData.salary && (
                  <p>
                    <strong>Salary:</strong> {link.scrapedData.salary}
                  </p>
                )}
                {link.scrapedData.jobDescription && (
                  <p>
                    <strong>Job Description:</strong>
                    <JobDescription
                      description={link?.scrapedData?.jobDescription || ""}
                    />
                  </p>
                )}
              </div>
            )}
          </>
        )}

        {link?.jobSiteChoice === "custom" && (
          <div className="mt-10">
            {/* Company Name */}
            <Label htmlFor="companyName" className="mt-6 text-lg font-semibold">
              Company Name
            </Label>
            <Input
              id="companyName"
              type="text"
              placeholder="Enter Company Name"
              className="border p-2 max-w-sm mt-2"
              value={link?.scrapedData?.companyName || ""}
              onChange={(e) => {
                const updatedLink = {
                  ...link,
                  scrapedData: { ...link.scrapedData, companyName: e.target.value },
                };
                setLink(updatedLink);
                updateLinksInLocalStorage(updatedLink);
              }}
            />

            {/* Location & Time */}
            <Label htmlFor="locationAndTime" className="mt-6 text-lg font-semibold">
              Location
            </Label>
            <Input
              id="locationAndTime"
              type="text"
              placeholder="Enter Location"
              className="border p-2 max-w-sm mt-2"
              value={link?.scrapedData?.locationAndTime || ""}
              onChange={(e) => {
                const updatedLink = {
                  ...link,
                  scrapedData: { ...link.scrapedData, locationAndTime: e.target.value },
                };
                setLink(updatedLink);
                updateLinksInLocalStorage(updatedLink);
              }}
            />

            {/* Salary */}
            <Label htmlFor="salary" className="mt-6 text-lg font-semibold">
              Salary
            </Label>
            <Input
              id="salary"
              type="text"
              placeholder="Enter Salary"
              className="border p-2 max-w-sm mt-2"
              value={link?.scrapedData?.salary || ""}
              onChange={(e) => {
                const updatedLink = {
                  ...link,
                  scrapedData: { ...link.scrapedData, salary: e.target.value },
                };
                setLink(updatedLink);
                updateLinksInLocalStorage(updatedLink);
              }}
            />

            {/* Job Description */}
            <Label htmlFor="jobDescription" className="mt-6 text-lg font-semibold">
              Job Description
            </Label>
            <Textarea
              rows={20}
              id="jobDescription"
              placeholder="Enter Job Description"
              className="border p-2 w-full max-w-2xl mt-2"
              value={link?.scrapedData?.jobDescription || ""}
              onChange={(e) => {
                const updatedLink = {
                  ...link,
                  scrapedData: { ...link.scrapedData, jobDescription: e.target.value },
                };
                setLink(updatedLink);
                updateLinksInLocalStorage(updatedLink);
              }}
            />
          </div>
        )}
      </div>
    </TabsContent>
  );
}

function JobDescription({ description }: { description: string }) {
  return (
    <div
      className="job-description"
      dangerouslySetInnerHTML={{ __html: description }}
    ></div>
  );
}
