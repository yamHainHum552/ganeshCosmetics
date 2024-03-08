import React from "react";
import DeleteProduct from "./DeleteProduct";

async function getProducts() {
  const data = await fetch("http://localhost:3000/api/products", {
    cache: "no-cache",
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
    <>
      <DeleteProduct products={products} />
    </>
  );
};

export default page;
export async function generateMetadata() {
  return {
    title: "Delete-Products | GC",
    description: "This is the dashboard page of Ganesh Cosmetics. ",
  };
}
