"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Product = ({ result }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const admin = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER}/api/users/login`
        );
        const result = await response.json();

        if (result.success) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    admin();
  }, []);
  const handleBack = () => {
    router.push("/products");
  };

  return (
    <div className="flex flex-col gap-5 w-full h-full items-center justify-center">
      {/* Go Back Button */}
      <div className="flex md:hidden gap-5 items-center justify-center">
        <h1 className="text-xl font-bold">Go Back:</h1>
        <FaArrowLeft className="font-bold text-xl" onClick={handleBack} />
      </div>
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
          src={result.image}
          width={400}
          height={400}
          alt="Product Image"
          priority="true"
          className="hover:scale-105 transition-all ease-in"
        />
      </div>
      {/* Price */}
      {!isAdmin ? (
        <div className="flex gap-2 items-center justify-center">
          <h1 className="font-bold text-3xl">Price -</h1>
          <h1 className="font-bold text-xl">Rs{result.retailPrice}</h1>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5">
          <div className="flex gap-2 items-center justify-center">
            <h1 className="font-bold text-xl sm:text-3xl">Retail Price -</h1>
            <h1 className="font-bold text-xl ">Rs{result.retailPrice}</h1>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <h1 className="font-bold text-xl sm:text-3xl">WholeSale Price -</h1>
            <h1 className="font-bold text-xl">Rs{result.wholesalePrice}</h1>
          </div>
        </div>
      )}

      <div className="flex gap-5 items-center justify-center flex-col">
        <h1 className="font-bold text-xl sm:text-3xl">Description:</h1>
        <p>{result.description}</p>
      </div>
    </div>
  );
};

export default Product;
