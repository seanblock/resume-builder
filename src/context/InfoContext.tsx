"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { ResumeType, ResumeLink, WritingType, PersonalType } from "@/fakeData/personal";
import starter from "@/fakeData/starter.json";

interface InfoContextType {
  personal: PersonalType;
  setPersonal: React.Dispatch<React.SetStateAction<PersonalType>>;
  links: ResumeLink[];
  setLinks: React.Dispatch<React.SetStateAction<ResumeLink[]>>;
  loading: boolean;
  importData: (data: PersonalType) => void;
  exportData: () => void;
  formatDateString: (date: Date | string | number) => string;
}

const InfoContext = createContext<InfoContextType | undefined>(undefined);

export const InfoProvider = ({ children }: { children: ReactNode }) => {
  const [personal, setPersonal] = useState<PersonalType>(() => {
    if (typeof window !== "undefined") {
      const storedPersonal = localStorage.getItem("personalData");
      return storedPersonal ? JSON.parse(storedPersonal) : { resume: starter, writing: { writingStyle: "", grammar: "" } };
    }
    return { resume: starter, writing: { writingStyle: "", grammar: "" } };
  });

  const [links, setLinks] = useState<ResumeLink[]>(() => {
    if (typeof window !== "undefined") {
      const storedLinks = localStorage.getItem("resumeLinks");
      return storedLinks ? JSON.parse(storedLinks) : [];
    }
    return [];
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const loadFromStorage = () => {
      const storedPersonal = localStorage.getItem("personalData");
      const storedLinks = localStorage.getItem("resumeLinks");

      if (storedPersonal) {
        setPersonal(JSON.parse(storedPersonal));
      }

      if (storedLinks) {
        setLinks(JSON.parse(storedLinks));
      }

      setLoading(false);
    };

    loadFromStorage();
  }, []);

  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem("personalData", JSON.stringify(personal));
      } catch (error) {
        console.error("Error saving personal data to localStorage:", error);
      }
    }
  }, [personal, loading]);

  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem("resumeLinks", JSON.stringify(links));
      } catch (error) {
        console.error("Error saving links to localStorage:", error);
      }
    }
  }, [links, loading]);

  const importData = useCallback((data: PersonalType) => {
    setPersonal(data);
  }, []);

  const exportData = useCallback(() => {
    const dataStr = JSON.stringify(personal, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "resume-builder-config.json";
    link.click();

    URL.revokeObjectURL(url);
  }, [personal]);

  const formatDateString = useCallback((date: Date | string | number) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime())
      ? parsedDate.toISOString().slice(0, 10)
      : "";
  }, []);

  return (
    <InfoContext.Provider
      value={{
        personal,
        setPersonal,
        links,
        setLinks,
        loading,
        importData,
        exportData,
        formatDateString,
      }}
    >
      {!loading && children}
    </InfoContext.Provider>
  );
};

export const useInfo = (): InfoContextType => {
  const context = useContext(InfoContext);
  if (!context) {
    throw new Error("useInfo must be used within an InfoProvider");
  }
  return context;
};