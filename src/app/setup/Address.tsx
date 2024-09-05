import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ResumeType } from "@/fakeData/personal";

export default function Address({
  resume,
  setResume
}:{
  resume: ResumeType,
  setResume: (updatedResume: ResumeType) => void
}) {
  return (
    <div className="max-w-4xl">
      <h4 className="text-lg font-semibold mt-10 mb-5">Address</h4>
      <div className="flex w-full gap-10">
        <div className="w-full">
          <Label htmlFor="street">Street</Label>
          <Input
            id="street"
            value={resume.address.street ?? ""}
            onChange={(e) =>{
              console.log(e.target.value)
              setResume({
                ...resume,
                address: { ...resume.address, street: e.target.value },
              })}
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={resume.address.city ?? ""}
            onChange={(e) =>
              setResume({
                ...resume,
                address: { ...resume.address, city: e.target.value },
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={resume.address.state ?? ""}
            onChange={(e) =>
              setResume({
                ...resume,
                address: { ...resume.address, state: e.target.value },
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="zip">Zip Code</Label>
          <Input
            id="zip"
            value={resume.address.zip ?? ""}
            onChange={(e) =>
              setResume({
                ...resume,
                address: { ...resume.address, zip: e.target.value },
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
