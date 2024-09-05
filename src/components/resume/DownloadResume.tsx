import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { ResumeType } from "@/fakeData/personal";
import { toast } from "sonner";

const formatDate = (dateString: string | Date | null) => {
  if (!dateString) return "";
  const date = typeof dateString === "string" ? parseISO(dateString) : dateString;
  return format(date, "MMM yyyy");
};

const formatResumeData = (resume: any) => {
  console.log("Resume:", resume);
  return {
    ...resume,
    experience: Array.isArray(resume.experience)
      ? resume.experience.map((exp: any) => ({
          ...exp,
          start: exp.start ? formatDate(exp.start) : "",
          end: exp.end ? formatDate(exp.end) : "Present",
        }))
      : [],
    education: Array.isArray(resume.education)
      ? resume.education.map((edu: any) => ({
          ...edu,
          start: edu.start ? formatDate(edu.start) : "",
          end: edu.end
            ? formatDate(edu.end)
            : edu.current
            ? "Anticipated Graduation"
            : "",
        }))
      : [],
    certificates: Array.isArray(resume.certificates)
      ? resume.certificates.map((cert: any) => ({
          ...cert,
          issue_date: cert.issue_date ? formatDate(cert.issue_date) : "",
          expiration_date: cert.expiration_date
            ? formatDate(cert.expiration_date) : "",
        }))
      : [],
    projects: Array.isArray(resume.projects)
      ? resume.projects.map((proj: any) => ({
          ...proj,
          start: proj.start ? formatDate(proj.start) : "",
          end: proj.end ? formatDate(proj.end) : "Present",
        }))
      : [],
    skills: Array.isArray(resume.skills)
      ? resume.skills.map((skill: string, index: number) => ({
          skill: skill,
          isLast: index === resume.skills.length - 1,
        }))
      : [],
  };
};


const DownloadResume = ({ resume }: { resume: ResumeType }) => {
  const handleGenerateDoc = () => {
    const formattedResume = formatResumeData(resume);
    console.log("Formatted Resume:", formattedResume);
    generateDocument(formattedResume);
  };

  return (
    <Button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleGenerateDoc}
    >
      Download Word Resume
    </Button>
  );
};

export default DownloadResume;

const loadTemplate = async () => {
  const response = await fetch("/resumes/resumeTemplate1.docx");
  const templateArrayBuffer = await response.arrayBuffer();

  const zip = new PizZip(templateArrayBuffer);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  return doc;
};

const generateDocument = async (data: Record<string, any>) => {
  try {
    const doc = await loadTemplate();

    console.log("Data passed to docxtemplater:", data);

    doc.setData(data);

    doc.render();

    const out = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    saveAs(out, "resume.docx");
  } catch (error:any) {
    console.error("Error generating document:", error);
    toast("Error generating document", { 
      position: "top-right",
      description: error.message,
     });
  }
};
