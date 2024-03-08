"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const links = [
  { url: "/", title: "Home" },
  { url: "/about", title: "About" },
  { url: "/products", title: "Products" },
  { url: "/contact", title: "Contact" },
];

const ClientNav = () => {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const admin = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users/login", {
          method: "GET",
        });
        const result = await response.json();

        if (result.success) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    admin();
  }, []);
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/logout");
      const result = await response.json();
      if (result.success) {
        setIsAdmin(false);
        toast.success(result.result);
        router.push("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const pathName = usePathname();
  // isAdmin && links.push({ url: "/dashboard", title: "Dashboard" });

  const handleOpen = () => {
    setOpen(!open);
  };
  const topVariants = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: 35,
    },
  };
  const middleVariants = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  };
  const lastVariants = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: -35,
    },
  };
  const listVariants = {
    closed: {
      x: "100vw",
    },
    opened: {
      x: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };
  const listItemVariants = {
    closed: {
      x: -10,
      opacity: 0,
    },
    opened: {
      x: 0,
      opacity: 1,
    },
  };
  return (
    <div className="h-24 flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 ">
      {/* page logo */}
      <div className="  lg:flex  lg:justify-center ">
        <Link
          href="/"
          className="text-sm  rounded-md p-1 font-semibold flex items-center justify-between "
        >
          <span className="text-white  text-xl sm:text-3xl">G</span>
          <span className="text-white  text-xl sm:text-3xl">C</span>
        </Link>
      </div>
      <div className="hidden md:flex gap-5 w-1/3">
        {links.map((link) => (
          <Link
            href={link.url}
            key={link.title}
            className={`font-semibold p-1 ${
              pathName == link.url ? " text-blue-500 rounded-md " : ""
            } `}
          >
            {link.title}
          </Link>
        ))}
        {isAdmin && (
          <div className="flex items-center justify-center gap-5">
            <Link
              href="/dashboard"
              className={`font-semibold p-1 ${
                pathName == "/dashboard" ? " text-blue-500 rounded-md " : ""
              } `}
            >
              Dashboard
            </Link>
            <button className="text-blue-800 " onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>

      {/* responsive view */}
      <div className="flex md:hidden h-full items-center">
        <button
          className="w-10 h-8 flex flex-col items-center justify-around  z-50 relative"
          onClick={handleOpen}
        >
          <motion.div
            className={`w-10 h-1 bg-white rounded origin-left`}
            variants={topVariants}
            animate={open ? "opened" : "closed"}
          ></motion.div>
          <motion.div
            className={`w-10 h-1 bg-white rounded`}
            variants={middleVariants}
            animate={open ? "opened" : "closed"}
          ></motion.div>
          <motion.div
            className="w-10 h-1 bg-white rounded origin-left"
            variants={lastVariants}
            animate={open ? "opened" : "closed"}
          ></motion.div>
        </button>
        {open ? (
          <motion.div
            className="absolute overflow-hidden top-0 left-0 bg-black text-white h-full w-full flex flex-col items-center gap-8 text-4xl justify-center overflow-x-hidden overflow-y-hidden z-20"
            variants={listVariants}
            initial="closed"
            animate="opened"
          >
            {links.map((link) => (
              <motion.div variants={listItemVariants}>
                <Link
                  href={link.url}
                  key={link.url}
                  className={`${pathName == link.url ? "text-blue-500" : ""}`}
                >
                  {link.title}
                </Link>
              </motion.div>
            ))}
            {isAdmin && (
              <div className="flex flex-col gap-5 items-center justify-center">
                <motion.div variants={listItemVariants}>
                  <Link
                    href="/dashboard"
                    className={`${
                      pathName == "/dashboard" ? "text-blue-800" : ""
                    }`}
                  >
                    Dashboard
                  </Link>
                </motion.div>
                <motion.div variants={listItemVariants}>
                  <button className="text-blue-500 " onClick={handleLogout}>
                    Logout
                  </button>
                </motion.div>
              </div>
            )}
          </motion.div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ClientNav;
