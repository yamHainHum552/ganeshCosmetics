"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { MdDashboardCustomize, MdLogin, MdLogout } from "react-icons/md";
import { FaCartPlus, FaHome, FaMailBulk, FaStore } from "react-icons/fa";

const links = [
  { url: "/", title: "Home", logo: <FaHome /> },
  { url: "/about", title: "About", logo: <FaStore /> },
  { url: "/products", title: "Products", logo: <FaCartPlus /> },
  { url: "/contact", title: "Contact", logo: <FaMailBulk /> },
];

const ClientNav = () => {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const close_menu = () => {
      setOpen(false);
      document.body.style.overflow = "visible";
    };
    close_menu();
  }, [pathName]);

  useEffect(() => {
    const admin = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER}/api/users/login`
        );
        const result = await response.json();

        if (result.success) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    admin();
  }, []);
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/users/logout`
      );
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

  const handleOpen = () => {
    setOpen(!open);

    if (!open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
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
    <div
      className={`h-24 flex items-center justify-between  px-4 sm:px-8 md:px-12 
      `}
    >
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
      <div className="hidden lg:flex gap-5 w-1/2">
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
        {isAdmin ? (
          <div className="flex items-center justify-center gap-5">
            <Link
              href="/dashboard"
              className={`font-semibold p-1 ${
                pathName == "/dashboard" ? " text-blue-500 rounded-md " : ""
              } `}
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-white flex items-center font-bold gap-2"
            >
              Logout
              <MdLogout className="text-white" />
            </button>
          </div>
        ) : (
          <motion.div
            variants={listItemVariants}
            className="flex items-center justify-center"
          >
            <Link
              href="/login"
              className={`${
                pathName == "/login" ? "text-blue-500" : ""
              } flex items-center justify-center gap-2 font-semibold `}
            >
              Admin Login
              <MdLogin />
            </Link>
          </motion.div>
        )}
      </div>

      {/* responsive view */}
      <div className="flex lg:hidden h-full items-center ">
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
            className="absolute  top-0 left-0 background text-white h-full w-full flex flex-col items-center gap-8 text-3xl justify-center z-20"
            variants={listVariants}
            initial="closed"
            animate="opened"
            transition={{ duration: 1 }}
          >
            {links.map((link) => (
              <motion.div variants={listItemVariants} key={link.title}>
                <Link
                  href={link.url}
                  className={`${
                    pathName == link.url ? "text-blue-500" : ""
                  } flex gap-2`}
                >
                  {link.logo}
                  {link.title}
                </Link>
              </motion.div>
            ))}
            {isAdmin ? (
              <div className="flex flex-col gap-5 items-center justify-center w-full">
                <motion.div variants={listItemVariants} className="flex gap-2">
                  <MdDashboardCustomize
                    className={`${
                      pathName == "/dashboard" ? "text-blue-500" : ""
                    }`}
                  />
                  <Link
                    href="/dashboard"
                    className={`${
                      pathName == "/dashboard" ? "text-blue-500" : ""
                    }`}
                  >
                    Dashboard
                  </Link>
                </motion.div>
                <motion.div variants={listItemVariants}>
                  <button
                    onClick={handleLogout}
                    className="text-white flex items-center gap-2"
                  >
                    Logout
                    <MdLogout className="text-white" />
                  </button>
                </motion.div>
              </div>
            ) : (
              <motion.div variants={listItemVariants}>
                <Link
                  href="/login"
                  className={`${
                    pathName == "/login" ? "text-blue-500" : ""
                  } flex gap-2 `}
                >
                  <MdLogin />
                  Admin Login
                </Link>
              </motion.div>
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
