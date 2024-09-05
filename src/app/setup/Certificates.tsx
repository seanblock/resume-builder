import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useInfo } from "../../context/InfoContext";
import { LucidePlus, LucideTrash } from "lucide-react";
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

export default function Certificates({
  resume,
  setResume
}:{
  resume: ResumeType,
  setResume: (updatedResume: ResumeType) => void
}) {
  const [index, setIndex] = useState(0);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const addCertificate = () => {
    const newCertificate = {
      name: "",
      issuer: "",
      issue_date: null,
      expiration_date: null,
    };
    setResume({
      ...resume,
      certificates: [...resume.certificates, newCertificate],
    });
    setIndex(resume.certificates.length);
  };

  const removeCertificate = () => {
    if (deleteIndex !== null) {
      const updatedCertificates = resume.certificates.filter(
        (_, i) => i !== deleteIndex
      );
      setResume({ ...resume, certificates: updatedCertificates });
      setIndex(Math.max(0, deleteIndex - 1));
      setDeleteIndex(null);
    }
  };

  return (
    <div className="flex gap-6 w-full max-w-4xl">
      <div className="w-[200px] shrink-0">
        <h4 className="text-lg font-semibold mb-5">Certificates</h4>
        {/* List of certificates */}
        <ul className="w-full mb-2">
          {resume.certificates.map((cert, i) => (
            <li key={i}>
              <Button
                className={`p-2 rounded w-full line-clamp-1 overflow-hidden ${
                  i === index
                    ? "bg-blue-600 hover:bg-blue-600 hover:text-white text-white"
                    : "cursor-pointer"
                }`}
                variant="ghost"
                onClick={() => setIndex(i)}
              >
                {/* only allow 20 chars */}
                {cert.name.length > 20
                  ? cert.name.slice(0, 20) + "..."
                  : cert.name}
              </Button>
            </li>
          ))}
        </ul>
        <Button className="w-full" onClick={addCertificate}>
          <LucidePlus size={16} className="mr-2" />
          Add Certificate
        </Button>
      </div>
      {resume.certificates.length > 0 && (
        <div className="flex flex-col gap-5 mb-5 w-full max-w-2xl">
          <div>
            <Label htmlFor={`cert-name-${index}`}>Certificate Name</Label>
            <Input
              id={`cert-name-${index}`}
              value={resume.certificates[index]?.name ?? ""}
              onChange={(e) => {
                const updatedCertificates = [...resume.certificates];
                updatedCertificates[index].name = e.target.value;
                setResume({ ...resume, certificates: updatedCertificates });
              }}
            />
          </div>
          <div>
            <Label htmlFor={`issuer-${index}`}>Issuer</Label>
            <Input
              id={`issuer-${index}`}
              value={resume.certificates[index]?.issuer ?? ""}
              onChange={(e) => {
                const updatedCertificates = [...resume.certificates];
                updatedCertificates[index].issuer = e.target.value;
                setResume({ ...resume, certificates: updatedCertificates });
              }}
            />
          </div>
          <div className="flex items-center gap-6">
            <div>
              <Label htmlFor={`issue-date-${index}`}>Issue Date</Label>
              <Input
                id={`issue-date-${index}`}
                type="date"
                value={
                  resume.certificates[index]?.issue_date
                    ? new Date(resume.certificates[index].issue_date)
                        .toISOString()
                        .slice(0, 10)
                    : ""
                }
                onChange={(e) => {
                  const updatedCertificates = [...resume.certificates];
                  updatedCertificates[index].issue_date = new Date(
                    e.target.value
                  );
                  setResume({ ...resume, certificates: updatedCertificates });
                }}
              />
            </div>
            <div>
              <Label htmlFor={`expiration-date-${index}`}>
                Expiration Date
              </Label>
              <Input
                id={`expiration-date-${index}`}
                type="date"
                value={
                  resume.certificates[index]?.expiration_date
                    ? new Date(resume.certificates[index].expiration_date)
                        .toISOString()
                        .slice(0, 10)
                    : ""
                }
                onChange={(e) => {
                  const updatedCertificates = [...resume.certificates];
                  updatedCertificates[index].expiration_date = new Date(
                    e.target.value
                  );
                  setResume({ ...resume, certificates: updatedCertificates });
                }}
              />
            </div>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                onClick={() => setDeleteIndex(index)}
              >
                <LucideTrash size={16} className="mr-2" />
                Delete Certificate
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  certificate.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={removeCertificate}>
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
