"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { useInfo } from "@/context/InfoContext";

const mainLinks = [
  { href: "/resume", label: "Resume" },
  // { href: "/writing", label: "Writing" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="h-14 w-full border-b items-center flex gap-10 justify-between px-6">
      <div className="flex gap-10">
        <Link href="/" className="font-bold">Two Can Play That Game</Link>
        <Link href="/" className={pathname === "/" ? "text-blue-500" : ""}>
          Home
        </Link>
        {mainLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={pathname.startsWith(href) ? "text-blue-500" : ""}
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-center gap-10">
        <Link
          href="/setup/resume"
          className={pathname.startsWith("/setup") ? "text-blue-500" : ""}
        >
          Setup
        </Link>
        <SetupActions />
      </div>
    </nav>
  );
}


function SetupActions() {
  const { importData, exportData } = useInfo();

  const handleImport = async () => {
    try {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "application/json";
      fileInput.onchange = async (event: any) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const data = JSON.parse(e.target?.result as string);
            importData(data);
          };
          reader.readAsText(file);
        }
      };
      fileInput.click();
    } catch (error) {
      console.error("Error importing data:", error);
    }
  };

  return (
    <div className="flex gap-6 items-center">
      <Button variant="secondary" onClick={handleImport} size={"sm"}>
        Import
      </Button>
      <Button variant="default" onClick={exportData} size={"sm"}>
        Export
      </Button>
    </div>
  );
}