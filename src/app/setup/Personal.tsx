import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ResumeType } from "@/fakeData/personal";

export default function Personal({
  resume,
  setResume
}:{
  resume: ResumeType,
  setResume: (updatedResume: ResumeType) => void
}) {
  return (
    <div className="max-w-4xl">
      <h4 className="text-lg font-semibold mb-5">Personal Information</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <Label htmlFor="first-name">First Name</Label>
          <Input
            id="first-name"
            value={resume.name.first ?? ""}
            onChange={(e) =>
              setResume({
                ...resume,
                name: { ...resume.name, first: e.target.value },
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="middle-name">Middle Name</Label>
          <Input
            id="middle-name"
            value={resume.name.middle ?? ""}
            onChange={(e) =>
              setResume({
                ...resume,
                name: { ...resume.name, middle: e.target.value },
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="last-name">Last Name</Label>
          <Input
            id="last-name"
            value={resume.name.last ?? ""}
            onChange={(e) =>
              setResume({ ...resume, name: { ...resume.name, last: e.target.value } })
            }
          />
        </div>
      </div>
    </div>
  );
}
