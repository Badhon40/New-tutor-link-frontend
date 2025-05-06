"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Calendar, BookOpen, Users } from "lucide-react";

export default function TutorDashboard() {
  const infoCards = [
    { label: "Total Bookings", value: 8, icon: <BookOpen /> },
    { label: "Total Spent", value: "$2900", icon: <span>💳</span> },
    { label: "Upcoming Sessions", value: 0, icon: <Calendar /> },
    { label: "Completed Sessions", value: 0, icon: <span>✅</span> },
  ];

  const activityStats = [
    { label: "Enrolled Subjects", value: 0, icon: <BookOpen /> },
    { label: "Hired Tutors", value: 0, icon: <Users /> },
    { label: "Reviews Written", value: 4, icon: <Star /> },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-black space-y-6">
      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {infoCards.map((card, index) => (
          <Card key={index} className="shadow-md bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <CardContent className="p-4 space-y-3">
              <div className="text-sm text-gray-600 dark:text-gray-400">{card.label}</div>
              <div className="text-2xl font-semibold text-blue-600 dark:text-blue-500 flex items-center gap-3">
                {card.icon}
                <span>{card.value}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Learning Progress Section */}
      <section className="bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 space-y-6">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-500">📚 Learning Progress</h2>
        <div className="space-y-4">
          <ProgressBar label="Bookings Completion (0/8)" />
          <ProgressBar label="Upcoming Sessions (0/8)" />
          <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg text-gray-700 dark:text-gray-400 text-sm">
            <strong>Learning Tip:</strong> Regular study sessions of 25–30 minutes with short breaks in between can improve retention by up to 30%.
          </div>
        </div>
      </section>

      {/* Learning Activity Section */}
      <section className="bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-500 mb-4">🔺 Learning Activity</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {activityStats.map((stat, i) => (
            <Card key={i} className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
              <CardContent className="flex flex-col items-center py-6">
                <div className="text-gray-600 dark:text-gray-400 text-3xl mb-3">{stat.icon}</div>
                <div className="text-4xl font-bold text-blue-800 dark:text-teal-500">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
          <strong>Activity Summary:</strong> You’ve been making steady progress! Your engagement is active. Consider hiring a tutor to accelerate your learning.
        </p>
      </section>
    </div>
  );
}

function ProgressBar({ label }: { label: string }) {
  return (
    <div className="w-full">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</div>
      <div className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-full">
        <div className="h-2 bg-blue-500 dark:bg-teal-500 w-[30%] rounded-full"></div>
      </div>
    </div>
  );
}
