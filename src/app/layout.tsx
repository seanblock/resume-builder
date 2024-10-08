import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ResumeProvider } from "@/context/ResumeContext";
import { Toaster } from "@/components/ui/sonner";
import { InfoProvider } from "@/context/InfoContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Two Can Play That Game",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          inter.className + "w-screen h-screen flex flex-col overflow-hidden"
        }
      >
        <InfoProvider>
          <Navbar />
          <div className="h-full w-full flex flex-row overflow-hidden">
            {children}
          </div>
          <Toaster />
        </InfoProvider>
      </body>
    </html>
  );
}
