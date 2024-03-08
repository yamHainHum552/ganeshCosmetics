import React from "react";
import Contact from "./Contact";

const page = () => {
  return (
    <>
      <Contact />
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    title: "Contact | GC",
    description:
      "This is the Contact page of Ganesh Cosmetics. Here you contact directly to the owner ",
  };
}
