import React from "react";
import Login from "./Login";

const page = () => {
  return (
    <>
      <Login />
    </>
  );
};

export default page;
export async function generateMetadata() {
  return {
    title: "Login | GC",
    description: "This is Login Page for Admin",
  };
}
