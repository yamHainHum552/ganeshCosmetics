"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ClientHero = () => {
  return (
    <div className="flex items-center justify-center w-full gap-10">
      <div className="flex flex-col w-full lg:w1/3  gap-5  items-center sm:justify-center h-full ">
        <div className="w-full flex items-center justify-center gap-5 flex-col sm:flex-row">
          <motion.div
            initial={{ x: "-200vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-center items-center"
          >
            <h1 className="text-5xl  sm:text-7xl font-bold text-white">
              Ganesh
            </h1>
          </motion.div>
          <motion.div
            initial={{ x: "200vw", opacity: 0.1 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-center items-center "
          >
            <h1 className="text-5xl  sm:text-7xl font-bold text-white">
              Cosmetics
            </h1>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="md:text-3xl  font-bold text-center">
            Where
            <span className="text-green-500"> Beauty</span> meets
            <span className="text-blue-500"> Affordability</span>.
          </h1>
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center items-center "
          >
            <h1 className="text-xl font-bold md:text-5xl lg:text-xl text-white flex flex-col md:flex-row">
              <span className="text-green-500 md:mr-2">Proprietor-</span>
              <span className="">Purna Pr. Guragain</span>
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
          <button className="bg-green-500 font-sm  sm:font-bold hover:bg-green-600  p-1 sm:p-2 rounded-lg ">
            <Link href="/products">Lets Go&#8594;</Link>
          </button>
        </motion.div>
      </div>
      <motion.div
        className="relative hidden lg:flex w-2/3 h-full"
        initial={{ x: "200vw" }}
        animate={{ x: 0 }}
      >
        <Image src="/hero.svg" height={500} width={500} alt="hero-Image" />
      </motion.div>
    </div>
  );
};

export default ClientHero;
