import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useInfo } from "../../context/InfoContext";
import { ResumeType } from "@/fakeData/personal";

export default function Contact({
  resume,
  setResume
}:{
  resume: ResumeType,
  setResume: (updatedResume: ResumeType) => void
}) {
  return (
    <div className="max-w-4xl">
      <h4 className="text-lg font-semibold mt-10 mb-5">Contact Information</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={resume.contact.email ?? ""}
            onChange={(e) =>
              setResume({
                ...resume,
                contact: { ...resume.contact, email: e.target.value },
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={resume.contact.phone ?? ""}
            onChange={(e) =>
              setResume({
                ...resume,
                contact: { ...resume.contact, phone: e.target.value },
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="personal-website">Personal Website</Label>
          <Input
            id="personal-website"
            value={resume.contact.personal_website ?? ""}
            onChange={(e) =>
              setResume({
                ...resume,
                contact: { ...resume.contact, personal_website: e.target.value },
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="linkedIn">LinkedIn</Label>
          <Input
            id="linkedIn"
            value={resume.contact.linkedIn ?? ""}
            onChange={(e) =>
              setResume({
                ...resume,
                contact: { ...resume.contact, linkedIn: e.target.value },
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
