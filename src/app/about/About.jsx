"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const content = [
  {
    title: "About",
    description:
      "Welcome to Ganesh Cosmetics, your premier destination for high-quality wholesale cosmetics. Founded by Purna Prasad Guragain, Ganesh Cosmetics has been a cornerstone in the beauty industry for over 15 years in Pathari-Sanischare Municipality.",
  },
  {
    title: "Our Story",
    description:
      "Purna Prasad Guragain, a visionary entrepreneur, embarked on a journey to fulfill the cosmetic needs of PathariSanischare Municipality and beyond. With a passion for beauty and a keen understanding of market demands,Purna Guragain established Ganesh Cosmetics with a commitment to providing top-notch products and exceptional service.",
  },
  {
    title: "What Sets Us Apart",
    description:
      "With over a decade of experience, Ganesh Cosmetics has become synonymous with reliability, integrity, and quality. Our extensive network of suppliers ensures that we offer only the finest products, curated to meet the evolving needs of our customers.",
  },
  {
    title: "Visit Us Today",
    description:
      "Experience the difference at Ganesh Cosmetics and discover a world of beauty waiting for you. Visit our store in PathariSanischare Municipality or explore our online catalog to find your perfect beauty essentials.",
  },
];

const About = () => {
  return (
    <div className="flex flex-col w-full justify-between gap-5 md:gap-10 items-center">
      {/* Picture */}
      <motion.div
        initial={{ x: "-200vw" }}
        animate={{ x: 0 }}
        className="relative w-full  h-full flex items-center justify-center  "
      >
        <Image
          src="/about.jpg"
          alt="About Img"
          width={800}
          height={700}
          priority="true"
        />
      </motion.div>
      {/* Content */}
      <motion.div
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        className="w-full lg:w-2/3  flex  flex-col justify-center items-center  gap-10 "
      >
        {content.map((item) => (
          <div key={item.title} className="flex flex-col gap-5 justify-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              {item.title}
            </h1>
            <p className="text-[#b7bac1] font-semibold">{item.description}</p>
          </div>
        ))}
      </motion.div>

      <h1 className="text-xl font-bold text-center">
        Thank you for choosing Ganesh Cosmetics, where
        <span className="text-green-500"> beauty</span> meets
        <span className="text-blue-500"> affordability</span>.
      </h1>
    </div>
  );
};

export default About;
