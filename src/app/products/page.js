import React from "react";
import Product from "./Products";

async function getProducts() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/products`, {
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
    <div className="h-full flex flex-col items-center justify-center gap-10">
      <h1 className="text-5xl md:text-7xl font-bold">Products</h1>
      <Product products={products} />
    </div>
  );
};

export default page;
export async function generateMetadata() {
  return {
    title: "Products | GC",
    description:
      "This is the Products page of Ganesh Cosmetics. Here you can watch out the Cosmetics Items ",
  };
}
