import SidebarWriting from "@/components/SidebarWriting";
import { WritingFormProvider } from "@/context/WritingContext";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WritingFormProvider>
      <div className="flex h-full w-full">
        <SidebarWriting />
        <div className="h-full flex flex-col overflow-auto w-full">
          {children}
        </div>
      </div>
    </WritingFormProvider>
  );
}
