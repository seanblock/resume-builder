"use client";
import React, { createContext, useContext, useState } from "react";

interface WritingSettingsValues {
  writingStyle: "business" | "casual" | "professional" | "academic";
  writingMaterial: "paper" | "article" | "essay" | "email" | "chat" | "other";
  paragraphFormat:  "other";
  maxCharacters: number | null;
  minCharacters: number | null;
  grammarLevel: string;
}

interface WritingFormContextProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  writingSettings: WritingSettingsValues;
  setWritingSettings: (settings: WritingSettingsValues) => void;
  sourceContent: string;
  setSourceContent: (content: string) => void;
  chat: any[]
  setChat: any;
  message: string;
  setMessage: (message: string) => void;
  sendMessage: () => void;
  messageSending: boolean;
  setMessageSending: (sending: boolean) => void;
}

const WritingFormContext = createContext<WritingFormContextProps | undefined>(
  undefined
);

export const WritingFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);
  const [writingSettings, setWritingSettings] = useState<WritingSettingsValues>({
    writingStyle: "casual",
    writingMaterial: "other",
    paragraphFormat: "other",
    maxCharacters: null,
    minCharacters: null,
    grammarLevel: "intermediate",
  });
  const [sourceContent, setSourceContent] = useState("");
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [messageSending, setMessageSending] = useState(false);

  const sendMessage = () => {
    console.log("Message sent: ", message);
  }

  return (
    <WritingFormContext.Provider
      value={{
        loading,
        setLoading,
        writingSettings,
        setWritingSettings,
        sourceContent, 
        setSourceContent,
        chat, setChat,
        message, setMessage,

        // Buttons
        sendMessage,
        messageSending, setMessageSending
      }}
    >
      {children}
    </WritingFormContext.Provider>
  );
};

export const useWritingForm = () => {
  const context = useContext(WritingFormContext);
  if (!context) {
    throw new Error("useWritingForm must be used within a WritingFormProvider");
  }
  return context;
};
