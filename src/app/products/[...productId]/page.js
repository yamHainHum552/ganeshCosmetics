import React from "react";

import Product from "./Product";

const getProduct = async (id) => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/products/${id}`,
      {
        cache: "no-store",
      }
    );
    if (!data.ok) {
      throw new Error("Error fetching the product");
    }
    const product = await data.json();

    return product;
  } catch (error) {
    console.log(error);
  }
};
const page = async ({ params }) => {
  const { result } = await getProduct(params.productId[0]);

  return (
    <>
      <Product result={result} />
    </>
  );
};

export default page;
export async function generateMetadata({ params }) {
  const { result } = await getProduct(params.productId);
  return {
    title: `${result.name} | GC`,
    description:
      "This is the Products page of Ganesh Cosmetics. Here you can watch out the Cosmetics Items ",
  };
}
