import React from "react";
import EditProduct from "./EditProduct";

async function getProducts() {
  const data = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  if (!data.ok) {
    throw new Error("Cannot find products");
  }
  const products = data.json();
  return products;
}

const page = async () => {
  const products = await getProducts();
  return (
    <div className="h-full flex flex-col items-center justify-center gap-10">
      <EditProduct products={products} />
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
