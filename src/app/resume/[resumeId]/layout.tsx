"use client"
import { ResumeProvider } from '@/context/ResumeContext'
import { useParams } from 'next/navigation'
import React from 'react'

export default function ResumeLayout({
  children
}:{
  children: React.ReactNode
}) {
  const resumeId = useParams().resumeId as string
  return (
    <ResumeProvider resumeId={resumeId}>
      {children}
    </ResumeProvider>
  )
}
