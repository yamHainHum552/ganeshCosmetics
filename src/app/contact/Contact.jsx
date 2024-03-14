"use client";

import Contactcard from "@/components/contactcard/Contactcard";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();
    if (!name || !phone || !message || !email) {
      toast.error("Please don't leave the fields empty");
      return null;
    }

    await emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        form.current,
        {
          publicKey: process.env.NEXT_PUBLIC_KEY,
        }
      )
      .then(() => {
        console.log("hello");
        toast.success("Message Sent Successfully!");
        form.current.reset();
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    <div className=" flex justify-evenly items-center w-full gap-5 text-black flex-wrap">
      <motion.div
        className=" flex items-center md:w-1/3 w-full justify-center"
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email Address"
            name="user_email"
            className="p-4 rounded-md border-none outline-none bg-base-400 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="user_phone"
            className="p-4 rounded-md border-none outline-none bg-base-400 w-full"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <textarea
            id=""
            cols="30"
            rows="3"
            name="message"
            placeholder="message"
            className="p-4 rounded-md border-none outline-none bg-base-400"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button
            className="btn btn-primary text-white font-bold bg-blue-600 hover:bg-blue-700 p-2  rounded-md"
            type="submit"
          >
            Send
          </button>
        </form>
      </motion.div>
      <motion.div
        className="h-[500px] w-[1px] bg-white hidden lg:block"
        initial={{ y: "-200vh" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeIn" }}
      ></motion.div>
      <motion.div
        className=" md:w-1/3 flex flex-col gap-5  justify-center "
        initial={{ x: "200vw" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, ease: "easeIn" }}
      >
        <div className="flex items-center justify-center w-full">
          <h1 className="font-bold text-3xl lg:text-5xl text-white">
            Contact Details
          </h1>
        </div>
        <Contactcard />
      </motion.div>
    </div>
  );
};

export default Contact;
