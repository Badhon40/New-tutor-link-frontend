"use client";

import Link from "next/link";
import React from "react";
import { BookOpen } from "lucide-react";

const subjects: string[] = [
  "Math",
  "Physics",
  "English",
  "Biology",
  "Chemistry",
  "Higher Math",
  "Bangla",
  "Science",
  "Accounting",
  "Economics",
];

export default function Category() {
  return (
    <section className="py-16 bg-gradient-to-b from-white via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 dark:text-white mb-2">
          Browse by Subject
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-12">
          Find expert tutors based on the subject you need help with — whether it is math, science, or language.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {subjects.map((subject) => (
            <Link
              key={subject}
              href={`/tutors?subject=${encodeURIComponent(subject)}`}
              className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-400 to-blue-600 text-white dark:from-blue-600 dark:to-blue-800 shadow-md">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-base font-medium text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {subject}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
