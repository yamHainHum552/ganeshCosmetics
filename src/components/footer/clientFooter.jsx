"use client";
import Map from "./Map";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
const links = [
  { url: "/", title: "Home" },
  { url: "/about", title: "About" },
  { url: "/products", title: "Products" },
  { url: "/contact", title: "Contact" },
];

const ClientFooter = () => {
  const footer = useRef();
  const isFooterInView = useInView(footer, { once: true });

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full gap-4"
      initial={{ y: "100vh" }}
      animate={isFooterInView ? { y: 0 } : ""}
      ref={footer}
    >
      <div className="w-full h-[1px] bg-white"></div>

      <div className="flex flex-col md:flex-row justify-around items-center w-full">
        <div className="hidden md:flex flex-col gap-3 ">
          {links.map((link) => (
            <Link
              key={link.title}
              href={link.url}
              className="hover:text-blue-500"
            >
              {link.title}
            </Link>
          ))}
        </div>
        <Map />
      </div>
      {/* Copy right */}
      <div className="flex justify-around">
        <h1>&copy;All rights preserved.</h1>
        <h1>
          Coded by{" "}
          <span className="text-blue-500">
            <Link href={"https://www.github.com/yamhainhum552"}>
              Yam Guragain
            </Link>
          </span>
        </h1>
      </div>
    </motion.div>
  );
};

export default ClientFooter;
