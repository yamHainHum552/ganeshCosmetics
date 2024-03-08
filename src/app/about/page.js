import React from "react";
import About from "./About";

const page = () => {
  return (
    <>
      <About />
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    title: "About | GC",
    description:
      "This is the Contact page of Ganesh Cosmetics. Here you contact directly to the owner ",
  };
}
