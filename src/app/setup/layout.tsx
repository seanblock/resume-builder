"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SetupLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="h-full flex flex-col overflow-auto w-full">
        {children}
      </div>
    </>
  );
}

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/setup/resume", label: "Resume Setup" },
    { href: "/setup/prompt", label: "Resume Prompt Setup" },
    // { href: "/setup/writing", label: "Writing Prompt Setup" },
  ];

  return (
    <div className="h-full w-64 bg-blue-50 text-blue-800 flex flex-col shadow-lg">
      <div className="p-4 text-2xl font-bold border-b border-blue-200">
        Setup
      </div>
      <div className="flex flex-col p-4 space-y-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-lg font-semibold ${
              pathname === link.href ? "text-blue-600" : "text-neutral-600 hover:text-blue-800"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
