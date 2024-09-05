import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LucidePlus, LucideTrash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ResumeType } from "@/fakeData/personal";

export default function Education({
  resume,
  setResume
}:{
  resume: ResumeType,
  setResume: (updatedResume: ResumeType) => void
}) {
  const [index, setIndex] = useState(0);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const addEducation = () => {
    const newEducation = {
      school: "",
      degree: "",
      major: "",
      location: {
        city: "",
        state: "",
      },
      start: null,
      end: null,
      gpa: null,
      current: false,
    };
    setResume({
      ...resume,
      education: [...resume.education, newEducation],
    });
    setIndex(resume.education.length);
  };

  const removeEducation = () => {
    if (deleteIndex !== null) {
      const updatedEducation = resume.education.filter((_, i) => i !== deleteIndex);
      setResume({ ...resume, education: updatedEducation });
      setIndex(Math.max(0, deleteIndex - 1));
      setDeleteIndex(null);
    }
  };

  return (
    <div className="flex gap-6 w-full max-w-4xl">
      <div className="w-[200px] shrink-0">
        <h4 className="text-lg font-semibold mb-5">Education</h4>
        <ul className="w-full mb-2">
          {resume.education.map((edu, i) => (
            <li key={i}>
              <Button
                className={`p-2 rounded w-full line-clamp-1 ${
                  i === index
                    ? "bg-blue-600 hover:bg-blue-600 hover:text-white text-white"
                    : "cursor-pointer"
                }`}
                variant="ghost"
                onClick={() => setIndex(i)}
              >
                {/* Max char 20 */}
                {edu.school.length > 20
                  ? edu.school.slice(0, 20) + "..."
                  : edu.school}
              </Button>
            </li>
          ))}
        </ul>
        <Button className="w-full" onClick={addEducation}>
          <LucidePlus size={16} className="mr-2" />
          Add Education
        </Button>
      </div>
      {resume.education.length > 0 && (
        <div className="flex flex-col gap-5 mb-5 w-full max-w-2xl">
          <div>
            <Label htmlFor={`school-${index}`}>School</Label>
            <Input
              id={`school-${index}`}
              value={resume.education[index]?.school ?? ""}
              onChange={(e) => {
                const updatedEducation = [...resume.education];
                updatedEducation[index].school = e.target.value;
                setResume({ ...resume, education: updatedEducation });
              }}
            />
          </div>
          <div>
            <Label htmlFor={`degree-${index}`}>Degree</Label>
            <Input
              id={`degree-${index}`}
              value={resume.education[index]?.degree ?? ""}
              onChange={(e) => {
                const updatedEducation = [...resume.education];
                updatedEducation[index].degree = e.target.value;
                setResume({ ...resume, education: updatedEducation });
              }}
            />
          </div>
          <div>
            <Label htmlFor={`major-${index}`}>Major</Label>
            <Input
              id={`major-${index}`}
              value={resume.education[index]?.major ?? ""}
              onChange={(e) => {
                const updatedEducation = [...resume.education];
                updatedEducation[index].major = e.target.value;
                setResume({ ...resume, education: updatedEducation });
              }}
            />
          </div>
          <div>
            <Label htmlFor={`city-${index}`}>City</Label>
            <Input
              id={`city-${index}`}
              value={resume.education[index]?.location.city ?? ""}
              onChange={(e) => {
                const updatedEducation = [...resume.education];
                updatedEducation[index].location.city = e.target.value;
                setResume({ ...resume, education: updatedEducation });
              }}
            />
          </div>
          <div>
            <Label htmlFor={`state-${index}`}>State</Label>
            <Input
              id={`state-${index}`}
              value={resume.education[index]?.location.state ?? ""}
              onChange={(e) => {
                const updatedEducation = [...resume.education];
                updatedEducation[index].location.state = e.target.value;
                setResume({ ...resume, education: updatedEducation });
              }}
            />
          </div>
          <div className="flex gap-10 items-center">
            <div>
              <Label htmlFor={`start-${index}`}>Start Date</Label>
              <Input
                id={`start-${index}`}
                type="date"
                value={
                  resume.education[index]?.start &&
                  !isNaN(new Date(resume.education[index].start).getTime())
                    ? new Date(resume.education[index].start)
                        .toISOString()
                        .slice(0, 10)
                    : ""
                }
                onChange={(e) => {
                  const updatedEducation = [...resume.education];
                  updatedEducation[index].start = new Date(e.target.value);
                  setResume({ ...resume, education: updatedEducation });
                }}
              />
            </div>
            <div>
              <Label htmlFor={`end-${index}`}>End Date</Label>
              <Input
                id={`end-${index}`}
                type="date"
                value={
                  resume.education[index]?.end &&
                  !isNaN(new Date(resume.education[index].end).getTime())
                    ? new Date(resume.education[index].end)
                        .toISOString()
                        .slice(0, 10)
                    : ""
                }
                onChange={(e) => {
                  const updatedEducation = [...resume.education];
                  updatedEducation[index].end = new Date(e.target.value);
                  setResume({ ...resume, education: updatedEducation });
                }}
              />
            </div>
            <div className="flex items-center gap-1">
              <Checkbox
                id={`current-${index}`}
                checked={resume.education[index]?.current ?? false}
                onCheckedChange={(checked: boolean) => {
                  const updatedEducation = [...resume.education];
                  updatedEducation[index].current = checked;
                  setResume({ ...resume, education: updatedEducation });
                }}
              >
                Currently Enrolled
              </Checkbox>

              <Label htmlFor={`current-${index}`}>Currently Enrolled</Label>
            </div>
          </div>
          <div>
            <Label htmlFor={`gpa-${index}`}>GPA</Label>
            <Input
              id={`gpa-${index}`}
              type="number"
              step="0.01"
              value={
                resume.education[index]?.gpa
                  ? resume.education[index].gpa!.toString()
                  : ""
              }
              onChange={(e) => {
                const updatedEducation = [...resume.education];
                updatedEducation[index].gpa = e.target.value
                  ? parseFloat(e.target.value)
                  : null;
                setResume({ ...resume, education: updatedEducation });
              }}
            />
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                onClick={() => setDeleteIndex(index)}
              >
                <LucideTrash size={16} className="mr-2" />
                Delete Education
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the education entry.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={removeEducation}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
}
