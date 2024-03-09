import React from "react";
import Image from "next/image";

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
    <div className="flex flex-col gap-5 w-full h-full items-center justify-center">
      {/* Name and Category */}
      <div className="flex gap-5 md:gap-10 items-center justify-center">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-3xl">Name</h1>
          <h1>{result.name}</h1>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-3xl">Category</h1>
          <h1>{result.category}</h1>
        </div>
      </div>
      {/* Image */}
      <div>
        <Image
          src={"/contact.png"}
          width={400}
          height={400}
          alt="Product Image"
          priority="true"
        />
      </div>
      {/* Price */}
      <div className="flex gap-2 items-center justify-center">
        <h1 className="font-bold text-3xl">Price -</h1>
        <h1 className="font-bold text-xl">{result.retailPrice}</h1>
      </div>
      <div>
        <p>{result.description}</p>
      </div>
    </div>
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
