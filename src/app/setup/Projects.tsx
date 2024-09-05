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

export default function Projects({
  resume,
  setResume,
}: {
  resume: ResumeType;
  setResume: (updatedResume: ResumeType) => void
}) {
  const [index, setIndex] = useState(0);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const addProject = () => {
    const newProject = {
      name: "",
      description: "",
      start: null,
      end: null,
      bullets: [""],
      current: false,
    };
    setResume({
      ...resume,
      projects: [...resume.projects, newProject],
    });
    setIndex(resume.projects.length);
  };

  const removeProject = (index: number) => {
    const updatedProjects = resume.projects.filter((_, i) => i !== index);
    setResume({ ...resume, projects: updatedProjects });
    setIndex(Math.max(0, index - 1));
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      removeProject(deleteIndex);
      setDeleteIndex(null);
    }
  };

  return (
    <div>
      <div className="flex gap-6 w-full">
        <div className="w-[200px] shrink-0">
          <h4 className="text-lg font-semibold mb-5">Projects</h4>
          <ul className="w-full mb-2">
            {resume.projects.map((proj, i) => (
              <li key={i}>
                <Button
                  className={`p-2 rounded w-full ${
                    i === index
                      ? "bg-blue-600 hover:bg-blue-600 hover:text-white text-white"
                      : "cursor-pointer"
                  }`}
                  variant="ghost"
                  onClick={() => setIndex(i)}
                >
                  {proj.name.length ? proj.name : "Untitled"}
                </Button>
              </li>
            ))}
          </ul>
          <Button className="w-full" onClick={addProject}>
            <LucidePlus size={16} className="mr-2" />
            Add Project
          </Button>
        </div>
        {resume.projects.length > 0 && (
          <div className="flex flex-col gap-5 mb-5 w-full max-w-2xl">
            <div>
              <Label htmlFor={`proj-name-${index}`}>Project Name</Label>
              <Input
                id={`proj-name-${index}`}
                value={resume.projects[index]?.name ?? ""}
                onChange={(e) => {
                  const updatedProjects = [...resume.projects];
                  updatedProjects[index].name = e.target.value;
                  setResume({ ...resume, projects: updatedProjects });
                }}
              />
            </div>
            <div>
              <Label htmlFor={`proj-description-${index}`}>Description</Label>
              <Input
                id={`proj-description-${index}`}
                value={resume.projects[index]?.description ?? ""}
                onChange={(e) => {
                  const updatedProjects = [...resume.projects];
                  updatedProjects[index].description = e.target.value;
                  setResume({ ...resume, projects: updatedProjects });
                }}
              />
            </div>
            <div className="flex items-center gap-6">
              <div>
                <Label htmlFor={`proj-start-${index}`}>Start Date</Label>
                <Input
                  id={`proj-start-${index}`}
                  type="date"
                  value={formatDateString(resume.projects[index]?.start)}
                  onChange={(e) => {
                    const updatedProjects = [...resume.projects];
                    updatedProjects[index].start = new Date(e.target.value);
                    setResume({ ...resume, projects: updatedProjects });
                  }}
                />
              </div>
              <div>
                <Label htmlFor={`proj-end-${index}`}>End Date</Label>
                <Input
                  id={`proj-end-${index}`}
                  type="date"
                  value={formatDateString(resume.projects[index]?.end)}
                  onChange={(e) => {
                    const updatedProjects = [...resume.projects];
                    updatedProjects[index].end = new Date(e.target.value);
                    setResume({ ...resume, projects: updatedProjects });
                  }}
                />
              </div>

              <div className="flex items-center gap-1">
                <Checkbox
                  id={`current-${index}`}
                  checked={resume.projects[index]?.current}
                  onCheckedChange={(checked: boolean) => {
                    const updatedProjects = [...resume.projects];
                    updatedProjects[index].current = checked;
                    setResume({ ...resume, projects: updatedProjects });
                  }}
                />
                <Label htmlFor={`current-${index}`}>Project Ongoing</Label>
              </div>
            </div>
            <div>
              <Label htmlFor={`proj-bullets-${index}`}>Bullets</Label>
              <div className="flex flex-col gap-2">
                {resume.projects[index]?.bullets.map((bullet, bulletIndex) => (
                  <div key={bulletIndex} className="flex gap-2 items-center">
                    <Textarea
                      rows={2}
                      id={`proj-bullets-${index}-${bulletIndex}`}
                      value={bullet}
                      onChange={(e) => {
                        const updatedProjects = [...resume.projects];
                        updatedProjects[index].bullets[bulletIndex] =
                          e.target.value;
                        setResume({ ...resume, projects: updatedProjects });
                      }}
                    />
                    <Button
                      variant="destructive"
                      onClick={() => {
                        const updatedProjects = [...resume.projects];
                        updatedProjects[index].bullets = updatedProjects[
                          index
                        ].bullets.filter((_, i) => i !== bulletIndex);
                        setResume({ ...resume, projects: updatedProjects });
                      }}
                    >
                      <LucideTrash size={16} />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                className="mt-2"
                variant="secondary"
                onClick={() => {
                  const updatedProjects = [...resume.projects];
                  updatedProjects[index].bullets.push("");
                  setResume({ ...resume, projects: updatedProjects });
                }}
              >
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
                  Delete Project
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the project.
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
    </div>
  );
}

const formatDateString = (date: any) => {
  if (date instanceof Date && !isNaN(date.getTime())) {
    return date.toISOString().slice(0, 10);
  } else if (typeof date === "string" || typeof date === "number") {
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.toISOString().slice(0, 10);
    }
  }
  return "";
};
