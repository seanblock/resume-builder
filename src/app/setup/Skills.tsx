import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LucideX } from "lucide-react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ResumeType } from "@/fakeData/personal";

export default function Skills({
  resume,
  setResume,
}: {
  resume: ResumeType;
  setResume: (updatedResume: ResumeType) => void;
}) {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    const trimmedSkill = newSkill.trim();

    if (trimmedSkill === "" || resume.skills.includes(trimmedSkill)) return;

    setResume({
      ...resume,
      skills: [...resume.skills, trimmedSkill],
    });
    setNewSkill("");
  };

  const removeSkill = (skillToRemove: string) => {
    setResume({
      ...resume,
      skills: resume.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = resume.skills.indexOf(active.id);
      const newIndex = resume.skills.indexOf(over.id);

      setResume({
        ...resume,
        skills: arrayMove(resume.skills, oldIndex, newIndex),
      });
    }
  };

  return (
    <div className="max-w-4xl">
      <h4 className="text-lg font-semibold mt-10 mb-5">Skills</h4>
      <div className="flex gap-5 items-center mb-5">
        <div>
          <Label htmlFor="new-skill">Add Skill</Label>
          <div className="flex items-center gap-2">
            <Input
              id="new-skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addSkill();
                }
              }}
            />
            <Button onClick={addSkill} variant="secondary">
              Add
            </Button>
          </div>
        </div>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={resume.skills} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {resume.skills.map((skill) => (
              <SortableSkill
                key={skill}
                skill={skill}
                removeSkill={removeSkill}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableSkill({
  skill,
  removeSkill,
}: {
  skill: string;
  removeSkill: (skill: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: skill });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex items-center bg-blue-500 text-white px-3 py-1 rounded ${
        isDragging ? "w-full" : "w-auto"
      }`}
    >
      <span className="flex-1">{skill}</span>
      <Button
        variant="ghost"
        size="icon"
        className="ml-2"
        onClick={() => removeSkill(skill)}
      >
        <LucideX size={16} />
      </Button>
    </div>
  );
}
