export default function Home() {
  return (
    <div className="h-full  w-full flex flex-col items-center bg-gradient-to-b from-blue-50 to-blue-100 px-4">
      <h1 className="text-5xl font-extrabold text-blue-800 mt-20">
        Welcome to Two Can Play That Game
      </h1>

      <p className="text-lg text-gray-700 mt-6 text-center max-w-3xl">
        Create a professional resume with ease using our simple and intuitive form. This app is powered by Next.js and styled with Tailwind CSS, ensuring a seamless and responsive experience.
      </p>

      <div className="mt-16 bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h2 className="text-4xl font-semibold text-blue-700 mb-4 text-center">
          Getting Started
        </h2>
        <p className="text-gray-600 text-center">
          Begin by clicking on the &quot;Setup&quot; link in the navigation bar. You&apos;ll be guided to a form where you can enter your details to create your resume. It&apos;s that easy!
        </p>
      </div>
    </div>
  );
}
