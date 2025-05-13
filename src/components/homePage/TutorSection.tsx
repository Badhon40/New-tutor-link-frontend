"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user";

const TutorSection = ({ tutors }: { tutors: IUser[] }) => {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-blue-700 dark:text-white"
        >
          Meet Our Top Tutors 👩‍🏫👨‍🏫
        </motion.h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mt-4">
          Discover expert tutors across various subjects. Find the right mentor to elevate your learning journey.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {tutors.map((tutor, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="relative bg-white/90 dark:bg-gray-800/75 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="relative w-full h-56">
              <Image
                src="https://i.ibb.co.com/S7GPdmtF/young-black-man-icon-vector-man-icon-illustration-face-black-man-icon-african-people-icons-cartoon-s.webp"
                alt={tutor?.name || "Tutor"}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {tutor?.name}
              </h3>
              <p className="flex flex-wrap gap-2 mb-3">
                {tutor?.subjects?.split(",").map((subject, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full text-xs"
                  >
                    {subject.trim()}
                  </span>
                ))}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                {tutor?.bio}
              </p>
            </div>

            <Link
              href={`/tutors/${tutor?._id}`}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300"
            >
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                View Profile
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/tutors">
          <Button className="transition-transform duration-300 hover:-translate-y-1 hover:scale-105">
            See All Tutors
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default TutorSection;
