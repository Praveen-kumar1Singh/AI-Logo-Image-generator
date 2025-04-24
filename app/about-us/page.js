"use client";

import React from "react";
import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";

const contributors = [
  {
    name: "Praveen Kumar Singh",
    role: "Full Stack Developer",
    github: "https://github.com/Praveen-kumar1Singh",
    linkedin: "https://www.linkedin.com/in/praveenkumarsingh39",
  },
  {
    name: "Anubhuti",
    role: "Frontend Developer",
    github: "https://github.com/anubhuti02",
    linkedin: "http://www.linkedin.com/in/anubhuti-chandra-46097530a",
  },
  {
    name: "Komal",
    role: "Frontend Developer",
    github: "https://github.com/Komal25252",
    linkedin: "http://www.linkedin.com/in/komal-mishra-6a6388262",
  },
  {
    name: "Tushar",
    role: "Backend Developer",
    github: "https://github.com/Tushar-Anand-01",
    linkedin: "https://www.linkedin.com/in/tushar-anand-33205a252/",
  },
];

export default function AboutUsPage() {
  return (
    <main className="p-8 max-w-4xl mx-auto text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4">About GenLogo</h1>

      <p className="mb-6">
        <strong>GenLogo</strong> is an AI-based logo generator built to simplify the process of creating unique logos in seconds. 
        It leverages the power of artificial intelligence to deliver fast, visually appealing results, making it perfect for developers, startups, and creatives.
      </p>

      <p className="mb-10">
        The project is developed by a passionate team of students, each contributing their own expertise in full-stack, frontend, and backend development.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Contributors</h2>
      <ul className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contributors.map((person, index) => (
          <li key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-md text-center">
            <p className="text-lg font-semibold">{person.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{person.role}</p>
            <div className="flex justify-center gap-4 mt-2 text-xl">
              <a href={person.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub className="hover:text-black dark:hover:text-white" />
              </a>
              <a href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin className="hover:text-blue-700" />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
