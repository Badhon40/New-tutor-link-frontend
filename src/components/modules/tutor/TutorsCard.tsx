"use client";

import { MapPin, ScanEye } from "lucide-react";
import React from "react";
import Link from "next/link";
import { IUser } from "@/types/user";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import tutorProfile from '../../../../public/tuturProfile.jpg';

const TutorsCard = ({ tutor }: { tutor: IUser }) => {
  return (
    <div className="bg-white dark:bg-gray-800 relative overflow-hidden shadow-md group rounded-xl p-6 transition-all duration-300 hover:shadow-lg mb-6">
      <div className="flex flex-col lg:flex-row items-center gap-6">
        
        <div className="lg:w-1/4 relative">
          <Image
            src={tutor?.profilePicture || tutorProfile}
            alt={tutor?.name || "Tutor"}
            height={400}
            width={400}
            className="rounded-xl object-cover border-2 border-gray-200 dark:border-gray-700 group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="lg:w-2/4 space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-800 text-2xl uppercase dark:text-white font-semibold">
              {tutor?.name}
            </h1>
            <div className="flex items-center text-gray-500 gap-2 text-sm">
              <MapPin size={18} color="#f72b2b" />
              {tutor?.address ? tutor.address.split(",").pop()?.trim() : "N/A"}
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400">
            Hi! I am <span className="font-bold">{tutor?.name}</span>. I have extensive experience tutoring 
            <span className="font-bold">
              {" "}
              {tutor?.subjects
                ?.split(",")
                .map((subject) => subject.trim())
                .join(", ")}
            </span>, and I’m passionate about helping students understand challenging concepts with clarity and confidence.
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {tutor?.subjects?.split(",").map((subject, index) => (
              <span
                key={index}
                className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700"
              >
                {subject.trim()}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:w-1/4 text-center space-y-3">
          <p className="text-lg font-bold text-gray-800 dark:text-white">
            ⭐⭐⭐⭐⭐ {tutor?.averageRating?.toFixed(1)}
          </p>
          <p className="text-gray-500 dark:text-gray-400">${tutor?.price}/hr</p>
          <Link href={`/tutors/${tutor?._id}`}>
            <Button
              variant="outline"
              className="bg-blue-600 text-white dark:bg-blue-500 dark:text-white hover:bg-blue-700 transition-all duration-300"
            >
              <ScanEye />
              View Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorsCard;
