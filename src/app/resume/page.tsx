import React from 'react'

export default function Page() {
  return (
    <div className="flex flex-col items-center h-full py-10 text-center px-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Start Building Your Resume
      </h2>
      <p className="text-lg text-gray-600 max-w-xl">
        Select a job listing from the History in the sidebar, or create a new job listing by clicking the &quot;Add Job Listing&quot; button.
      </p>
    </div>
  );
}
