import React from "react";
import Delete from "./Delete";

const getProduct = async (id) => {
  try {
    const data = await fetch(`http://localhost:3000/api/products/${id}`);
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
  const { result } = await getProduct(params.productId);

  return (
    <>
      <Delete result={result} />
    </>
  );
};

export default page;

export async function generateMetadata({ params }) {
  const { result } = await getProduct(params.productId);
  return {
    title: `Delete-${result.name} | GC`,
    description: "This is Delete Page of Ganesh Cosmetics. ",
  };
}
