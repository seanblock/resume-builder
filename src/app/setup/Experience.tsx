import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LucidePlus, LucideTrash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
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
import TextareaAutosize from "react-textarea-autosize";

export default function Experience({
  resume,
  setResume,
}: {
  resume: ResumeType;
  setResume: (updatedResume: ResumeType) => void;
}) {
  const [index, setIndex] = useState(0);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const addExperience = () => {
    const newExperience = {
      title: "",
      company: "",
      location: "",
      start: null,
      end: null,
      bullets: [""],
      summary: "",
      current: false,
    };
    setResume({
      ...resume,
      experience: [...resume.experience, newExperience],
    });
    setIndex(resume.experience.length);
  };

  const removeExperience = (index: number) => {
    const updatedExperience = resume.experience.filter((_, i) => i !== index);
    setResume({ ...resume, experience: updatedExperience });
    setIndex(Math.max(0, index - 1));
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      removeExperience(deleteIndex);
      setDeleteIndex(null);
    }
  };

  const addBullet = () => {
    const updatedExperience = [...resume.experience];
    updatedExperience[index].bullets.push("");
    setResume({ ...resume, experience: updatedExperience });
  };

  const removeBullet = (bulletIndex: number) => {
    const updatedExperience = [...resume.experience];
    updatedExperience[index].bullets = updatedExperience[index].bullets.filter(
      (_, i) => i !== bulletIndex
    );
    setResume({ ...resume, experience: updatedExperience });
  };

  return (
    <div className="flex gap-6 w-full mt-10 max-w-4xl">
      <div className="w-[200px] shrink-0">
        <h4 className="text-lg font-semibold mb-5">Experience</h4>
        {/* List of experiences */}
        <ul className="w-full mb-2">
          {resume.experience.map((exp, i) => (
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
                {/* max 20 chars */}
                {exp.title.length > 20
                  ? exp.title.slice(0, 20) + "..."
                  : exp.title}
              </Button>
            </li>
          ))}
        </ul>
        <Button className="w-full" onClick={addExperience}>
          Add Experience
        </Button>
      </div>
      {resume.experience.length > 0 && (
        <div className="flex flex-col gap-5 mb-5 w-full">
          {/* Title */}
          <div>
            <Label htmlFor={`title-${index}`}>Title</Label>
            <Input
              className="max-w-xl"
              id={`title-${index}`}
              value={resume.experience[index]?.title ?? ""}
              onChange={(e) => {
                const updatedExperience = [...resume.experience];
                updatedExperience[index].title = e.target.value;
                setResume({ ...resume, experience: updatedExperience });
              }}
            />
          </div>
          {/* Company */}
          <div>
            <Label htmlFor={`company-${index}`}>Company</Label>
            <Input
              className="max-w-xl"
              id={`company-${index}`}
              value={resume.experience[index]?.company ?? ""}
              onChange={(e) => {
                const updatedExperience = [...resume.experience];
                updatedExperience[index].company = e.target.value;
                setResume({ ...resume, experience: updatedExperience });
              }}
            />
          </div>
          {/* Location */}
          <div>
            <Label htmlFor={`location-${index}`}>Location</Label>
            <Input
              className="max-w-xl"
              id={`location-${index}`}
              value={resume.experience[index]?.location ?? ""}
              onChange={(e) => {
                const updatedExperience = [...resume.experience];
                updatedExperience[index].location = e.target.value;
                setResume({ ...resume, experience: updatedExperience });
              }}
            />
          </div>
          {/* Start Date */}
          <div className="flex gap-10 items-center">
            <div>
              <Label htmlFor={`start-${index}`}>Start Date</Label>
              <Input
                className="w-fit"
                id={`start-${index}`}
                type="date"
                value={
                  resume.experience[index]?.start
                    ? new Date(resume.experience[index].start)
                        .toISOString()
                        .slice(0, 10)
                    : ""
                }
                onChange={(e) => {
                  const updatedExperience = [...resume.experience];
                  updatedExperience[index].start = new Date(e.target.value);
                  setResume({ ...resume, experience: updatedExperience });
                }}
              />
            </div>
            {/* End Date */}
            <div>
              <Label htmlFor={`end-${index}`}>End Date</Label>
              <Input
                id={`end-${index}`}
                type="date"
                value={
                  resume.experience[index]?.end instanceof Date
                    ? resume.experience[index].end.toISOString().slice(0, 10)
                    : ""
                }
                onChange={(e) => {
                  const updatedExperience = [...resume.experience];
                  updatedExperience[index].end = e.target.value
                    ? new Date(e.target.value)
                    : null;
                  setResume({ ...resume, experience: updatedExperience });
                }}
              />
            </div>
            {/* Present */}
            <div className="flex items-center gap-1">
              <Checkbox
                id={`current-${index}`}
                checked={resume.experience[index]?.current ?? false}
                onCheckedChange={(checked: boolean) => {
                  const updatedExperience = [...resume.experience];
                  updatedExperience[index].current = checked;
                  setResume({ ...resume, experience: updatedExperience });
                }}
              />
              <Label htmlFor={`current-${index}`}>Current Position</Label>
            </div>
          </div>

          {/* Summary */}
          <div className="flex flex-col">
            <Label htmlFor={`summary-${index}`}>Summary</Label>
            <TextareaAutosize
              placeholder="Enter a summary of your experience"
              id={`summary-${index}`}
              minRows={4}
              maxRows={12}
              className="border rounded resize-none p-2"
              value={resume.experience[index]?.summary ?? ""}
              onChange={(e) => {
                const updatedExperience = [...resume.experience];
                updatedExperience[index].summary = e.target.value;
                setResume({ ...resume, experience: updatedExperience });
              }}
            />
            </div>

          {/* Bullets */}
          <div>
            <Label htmlFor={`bullets-${index}`}>Bullets</Label>
            <div className="flex flex-col gap-2">
              {resume.experience[index]?.bullets.map((bullet, bulletIndex) => (
                <div key={bulletIndex} className="flex gap-2 items-center">
                  <Textarea
                    rows={2}
                    id={`bullet-${index}-${bulletIndex}`}
                    value={bullet}
                    onChange={(e) => {
                      const updatedExperience = [...resume.experience];
                      updatedExperience[index].bullets[bulletIndex] =
                        e.target.value;
                      setResume({ ...resume, experience: updatedExperience });
                    }}
                  />
                  <Button
                    variant="destructive"
                    onClick={() => removeBullet(bulletIndex)}
                  >
                    <LucideTrash size={16} />
                  </Button>
                </div>
              ))}
            </div>
            <Button className="mt-2" variant="secondary" onClick={addBullet}>
              <LucidePlus size={16} />
              Add Bullet
            </Button>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                onClick={() => setDeleteIndex(index)}
              >
                <LucideTrash size={16} className="mr-2" />
                Delete Experience
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  experience.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete}>
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
