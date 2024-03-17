"use client";
import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <motion.div
          initial={{ x: "200px" }}
          animate={{ x: 0 }}
          className="fixed bottom-4 z-50 right-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-2 rounded-full shadow-md transition  ease-in-out"
          onClick={scrollToTop}
        >
          <FaArrowUp />
        </motion.div>
      )}

      {/* <style jsx>{`
        .go-to-top {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #007bff;
          color: #ffffff;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          z-index: 1000;
        }

        .go-to-top:hover {
          background-color: #0056b3;
        }

        .go-to-top svg {
          font-size: 24px;
        }
      `}</style> */}
    </>
  );
};

export default GoToTop;
