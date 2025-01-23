import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="min-h-[80vh] flex flex-col justify-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Welcome to My Portfolio
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl">
          Exploring the intersection of technology and creativity through innovative projects
          and solutions.
        </p>
        <div className="mt-8 space-x-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            View Projects
          </button>
          <button className="border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            Contact Me
          </button>
        </div>
      </section>
    </div>
  );
}
