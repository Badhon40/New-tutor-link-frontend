"use client";
import Image from "next/image";
import { motion } from "framer-motion";
// import img from "../../../public/tutor.jpg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user";

const TutorSection = ({ tutors }: { tutors: IUser[] }) => {
  return (
    <section className="py-6 my-6 max-w-7xl mx-auto px-4 transition-colors duration-300">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-blue-700 dark:text-white"
        >
          Meet Our Top Tutors 👩‍🏫👨‍🏫
        </motion.h2>
        {/* Subtitle */}
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mt-4">
          Our expert tutors are here to help you with a variety of subjects. Browse through their profiles and find the right tutor for your learning needs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {tutors.map((tutor, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 group relative"
          >
            {/* Tutor Image */}
            <div className="relative w-full h-52">
              <Image
                src='https://media.istockphoto.com/id/187244393/photo/we-will-get-to-the-right-answer-eventually.jpg?s=612x612&w=0&k=20&c=sv85YclfSvJwBzxHipFN5YSNIDSU6YXe8skqZb6QVjw='
                alt={tutor?.name || "tutor"}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-102"
              />
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-blue-600 transition duration-300">
                {tutor?.name}
              </h3>

              <p className="text-blue-600 dark:text-blue-300 text-sm font-medium flex flex-wrap gap-1">
                {tutor?.subjects?.split(",").map((subject, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full text-xs font-semibold"
                  >
                    {subject.trim()}
                  </span>
                ))}
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                {tutor?.bio}
              </p>
            </div>

            {/* View Profile Button */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300">
              <Link
                href={`/tutors/${tutor?._id}`}
                className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                View Profile
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center my-10">
        <Link href="/tutors">
          <Button className="transition-transform duration-300 hover:-translate-y-1 hover:scale-105">
            See All
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default TutorSection;
