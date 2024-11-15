import React from "react";
import DisplayProduct from "@/components/displayProducts/DisplayProducts";

const page = async () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-10">
      <DisplayProduct buttonTitle={"Edit"} link={"/dashboard/editProduct"} />
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
