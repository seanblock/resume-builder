"use client";
import React from "react";
import { useInfo } from "@/context/InfoContext";
import Experience from "../Experience";
import Personal from "../Personal";
import Contact from "../Contact";
import Address from "../Address";
import Skills from "../Skills";
import Education from "../Education";
import Certificates from "../Certificates";
import Projects from "../Projects";
import { ResumeType } from "@/fakeData/personal";

function ResumePage() {
  const { personal, setPersonal } = useInfo();
  const { resume } = personal;

  const setResume = (updatedResume: ResumeType) => {
    setPersonal({
      ...personal,
      resume: updatedResume,
    });
  };

  return (
    <div className="p-6 container">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-2xl font-bold mb-10">Setup</h3>
      </div>
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
    </div>
  );
}

export default ResumePage;
