import React from "react";
import AddProduct from "./Addproduct";

const page = () => {
  return (
    <>
      <AddProduct />
    </>
  );
};

export default page;
export async function generateMetadata() {
  return {
    title: "Add-Product | GC",
    description: "This is the dashboard page of Ganesh Cosmetics. ",
  };
}
