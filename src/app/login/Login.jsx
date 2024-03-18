"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/users/login`,
        {
          method: "POST",
          body: JSON.stringify({
            userName,
            password,
          }),
        }
      );
      const result = await response.json();
      if (result.success) {
        window.location.reload();
        router.push("/dashboard");
        toast.success("Login Successfull");
      }
      toast.error(result.result);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <motion.div
      initial={{ y: "-200vh", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex flex-col  gap-5 border-white rounded-md p-3 border-2 items-center justify-center shadow-md shadow-white"
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-3xl md:text-5xl font-bold"
      >
        Admin Login
      </motion.h1>
      <div className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Username"
          autoComplete="off"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="p-4 text-black rounded-md border-none outline-none bg-base-400 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-4 text-black rounded-md border-none outline-none bg-base-400 w-full"
        />
      </div>
      <motion.button
        initial={{ y: "200vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="bg-blue-600 hover:bg-blue-700 rounded-lg text-white p-2 font-bold"
        onClick={handleLogin}
      >
        {isLoading ? "Loading" : "Login"}
      </motion.button>
    </motion.div>
  );
};

export default Login;
