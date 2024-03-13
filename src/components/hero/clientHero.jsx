"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const ClientHero = () => {
  return (
    <div className="flex flex-col  gap-5  items-center sm:justify-center h-full ">
      <div className="w-full flex items-center justify-center gap-5 flex-col sm:flex-row">
        <motion.div
          initial={{ x: "-200vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-center items-center"
        >
          <h1 className="text-7xl lg:text-8xl sm:text-7xl font-bold text-white">
            Ganesh
          </h1>
        </motion.div>
        <motion.div
          initial={{ x: "200vw", opacity: 0.1 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-center items-center "
        >
          <h1 className="text-7xl font-bold  text-white lg:text-8xl">
            Cosmetics
          </h1>
        </motion.div>
      </div>

      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center items-center "
        >
          <h1 className="text-3xl font-bold sm:text-5xl text-white lg:text-5xl flex flex-col md:flex-row">
            <span>Proprietor-</span>
            <span>Purna Pr. Guragain</span>
          </h1>
        </motion.div>
      </div>
      <motion.div
        className="flex items-center justify-center gap-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="font-semi-bold text-xl">View Products: </h1>
        <button className="bg-blue-600 text-white font-bold hover:bg-blue-700  p-2 rounded-lg ">
          <Link href="/products">Lets Go&#8594;</Link>
        </button>
      </motion.div>
    </div>
  );
};

export default ClientHero;
