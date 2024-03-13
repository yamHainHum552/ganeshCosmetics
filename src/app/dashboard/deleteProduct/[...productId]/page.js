import React from "react";
import Delete from "./Delete";

const getProduct = async (id) => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/products/${id}`
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

  const length = params.productId.length;
  const id = params.productId[length - 1].split(".")[0];

  return (
    <>
      <Delete result={result} id={id} />
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
