import React from "react";
import EditProduct from "./EditProduct";

const page = async () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-10">
      <EditProduct />
    </div>
  );
};

export default page;

export async function generateMetadata() {
  return {
    title: "Edit-Products | GC",
    description: "This is the dashboard page of Ganesh Cosmetics. ",
  };
}
