"use client";
import { motion } from "framer-motion";

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
          <h1 className="text-5xl font-bold sm:text-7xl text-white lg:text-8xl">
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
          <h1 className="text-xl font-bold sm:text-3xl text-white lg:text-5xl flex flex-col md:flex-row">
            <span>Proprietor-</span>
            <span>Purna Pr. Guragain</span>
          </h1>
        </motion.div>
      </div>
    </div>
  );
};

export default ClientHero;
