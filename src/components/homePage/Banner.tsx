"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import banner from "../../app/assets/banner.png"; // Adjust the path as necessary

const Banner = () => {
  const [subject, setSubject] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!subject.trim()) {
      toast("Please enter a subject name.");
      return;
    }
    const encodedSubject = encodeURIComponent(subject.trim());
    router.push(`/tutors?subject=${encodedSubject}`);
  };

  return (
    <section className="w-full bg-blue-50 dark:bg-gray-900 text-slate-900 dark:text-white py-12 px-6 mt-[80px]">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold text-blue-700 dark:text-white leading-tight">
            Find & Connect with the Best Tutors
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            TutorLink helps students succeed by matching them with top-rated,
            verified tutors across all subjects.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto md:mx-0">
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              type="text"
              placeholder="Find tutor by subject"
              className="w-full py-3 pl-12 pr-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 outline-none"
              aria-label="Search tutor by subject"
            />
            <Search
              className="absolute left-4 top-3.5 text-gray-500 dark:text-gray-400"
              size={20}
            />
          </div>

          {/* CTA Button */}
          <div className="flex justify-center md:justify-start pt-2">
            <Button onClick={handleSearch} className="md:px-8 md:py-5 bg-blue-600">
              Find Tutors
            </Button>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 relative w-full h-64 md:h-96">
          <Image
            src={banner}
            alt="Banner"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
