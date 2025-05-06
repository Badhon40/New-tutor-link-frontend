"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";

type Review = {
  name: string;
  role: string;
  reviewText: string;
  rating: number;
  authorImage: string;
};

export default function ReviewSection({ reviews }: { reviews: Review[] }) {
  const containerRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(containerRef, { once: true });

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isInView && !isHovered) {
      controls.start({
        x: ["0%", "-50%"],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 10,
            ease: "linear",
          },
        },
      });
    } else if (isHovered) {
      controls.stop(); // Pause on hover
    }
  }, [controls, isInView, isHovered]);

  return (
    <section className="max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900 py-20 px-4 md:px-8 overflow-hidden">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 dark:text-white">
          What Our Users Say
        </h2>
      </div>

      <div ref={containerRef} className="relative overflow-hidden">
        <motion.div
          className="flex w-max gap-6"
          animate={controls}
          initial={{ x: "0%" }}
        >
          {[...reviews, ...reviews].map((review, index) => (
            <div
              key={index}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-transform duration-300 min-w-[260px] sm:min-w-[300px] md:min-w-[350px] max-w-[90vw] hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src="https://static.vecteezy.com/system/resources/previews/046/548/705/non_2x/icon-author-related-to-book-symbol-line-style-simple-design-illustration-vector.jpg"
                  alt={review.name}
                  width={100}
                  height={100}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-base">
                    {review.name}
                  </h4>
                  {review.role && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">{review.role}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 mb-3 text-yellow-500">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic mb-4 line-clamp-4">
                “{review.reviewText}”
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
