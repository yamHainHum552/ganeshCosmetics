"use client";

import Contactcard from "@/components/contactcard/Contactcard";
import { motion } from "framer-motion";
import { useRef } from "react";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_TEMPLATE_ID,
        form.current,
        {
          publicKey: process.env.NEXT_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          console.log("hello");
          toast.success("Message Sent Successfully!");
          form.current.reset();
        },
        (error) => {
          toast.error(error.message);
        }
      );
  };
  return (
    <div className=" flex justify-center items-center w-full gap-5 text-black flex-wrap">
      <motion.div
        className=" flex items-center md:w-1/2 w-full justify-center"
        initial={{ x: "-200vw" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <form
          action=""
          ref={form}
          onSubmit={sendEmail}
          className="flex flex-col gap-5 items-center justify-center "
        >
          <h1 className="text-bold text-5xl md:text-7xl text-white">Contact</h1>

          <input
            type="text"
            placeholder="Name and Surname"
            name="from_name"
            className="p-4 rounded-md border-none outline-none bg-base-400 w-full"
          />
          <input
            type="email"
            placeholder="Your Email Address"
            name="user_email"
            className="p-4 rounded-md border-none outline-none bg-base-400 w-full"
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="user_phone"
            className="p-4 rounded-md border-none outline-none bg-base-400 w-full"
          />
          <textarea
            id=""
            cols="30"
            rows="3"
            name="message"
            placeholder="message"
            className="p-4 rounded-md border-none outline-none bg-base-400"
          ></textarea>
          <button
            className="btn btn-primary text-black font-bold bg-white p-2  rounded-md"
            type="submit"
          >
            Send
          </button>
        </form>
      </motion.div>
      <motion.div
        className=" md:w-1/3 flex flex-col gap-5  justify-center "
        initial={{ x: "200vw" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, ease: "easeIn" }}
      >
        <div className="flex items-center justify-center">
          <h1 className="font-bold text-3xl md:text-5xl text-white">
            Contact Details
          </h1>
        </div>
        <Contactcard />
      </motion.div>
    </div>
  );
};

export default Contact;
