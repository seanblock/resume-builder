import Sidebar from "@/components/Sidebar";
import React from "react";

export default function layouts({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="h-full flex flex-col overflow-auto w-full">
        {children}
      </div>
    </>
  );
}
