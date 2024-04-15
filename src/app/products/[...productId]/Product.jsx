"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { IoIosCall, IoLogoWhatsapp } from "react-icons/io";
import Link from "next/link";

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
    <>
      {/* Pc view */}
      <div className="hidden lg:flex w-full gap-10 justify-between items-center">
        <div className="flex flex-col gap-10 w-1/2 justify-center items-center">
          <div className="flex gap-10 justify-center w-full">
            <div className="flex flex-col gap-5 ">
              <h1 className="font-bold text-5xl">Name</h1>
              <h1 className="font-bold text-3xl text-slate-300">
                {result.name}
              </h1>
            </div>
            <div className="flex flex-col gap-5">
              <h1 className="font-bold text-5xl">Category</h1>
              <h1 className="font-bold text-3xl text-slate-300">
                {result.category}
              </h1>
            </div>
          </div>
          {!isAdmin ? (
            <div className="flex gap-2 items-center justify-center">
              <h1 className="font-bold text-3xl">Price: </h1>
              <h1 className="font-bold text-xl">Rs{result.retailPrice}</h1>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-5">
              <div className="flex gap-2 items-center justify-center">
                <h1 className="font-bold text-xl sm:text-3xl">Retail Price:</h1>
                <h1 className="font-bold text-xl ">Rs{result.retailPrice}</h1>
              </div>
              <div className="flex gap-2 items-center justify-center">
                <h1 className="font-bold text-xl sm:text-3xl">
                  WholeSale Price:
                </h1>
                <h1 className="font-bold text-xl">Rs{result.wholesalePrice}</h1>
              </div>
            </div>
          )}
          <div className="flex gap-5 items-center justify-center">
            <h1 className="font-bold text-3xl">Description:</h1>
            <p>{result.description}</p>
          </div>
        </div>
        <div className="h-[500px] w-[1px] bg-white hidden lg:block"></div>
        <div className="flex flex-col w-1/2 items-center gap-10">
          <div>
            <Image
              src={result.image}
              width={300}
              height={300}
              alt="Product Image"
              priority="true"
              className="hover:scale-105 transition-all ease-in"
            />
          </div>
          <div className="flex flex-col  gap-5 items-center justify-around">
            <div>
              <h1 className="font-bold text-3xl">Order now</h1>
            </div>
            <div className="flex items-center justify-between w-full font-bold text-3xl">
              <div className="animate-bounce">
                <Link
                  href={`https://wa.me/9842391510?text=${encodeURIComponent(
                    `I want to buy ${result.name} ${result.category}`
                  )}`}
                >
                  <IoLogoWhatsapp className="text-green-500 bg-white rounded-full" />
                </Link>
              </div>
              <div className="animate-bounce">
                <Link href="tel:9842391510">
                  <IoIosCall />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile view */}
      <div className="flex lg:hidden flex-col gap-5 w-full h-full items-center justify-center ">
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
              <h1 className="font-bold text-xl sm:text-3xl">
                WholeSale Price -
              </h1>
              <h1 className="font-bold text-xl">Rs{result.wholesalePrice}</h1>
            </div>
          </div>
        )}

        <div className="flex gap-5 items-center justify-center  flex-col">
          <h1 className="font-bold text-xl sm:text-3xl">Description:</h1>
          <p>{result.description}</p>
        </div>

        <div className="flex sticky items-center justify-around w-full font-bold text-3xl">
          <div className="animate-bounce">
            <Link
              href={`https://wa.me/9842391510?text=${encodeURIComponent(
                `I want to buy ${result.name} ${result.category}`
              )}`}
            >
              <IoLogoWhatsapp className="text-green-500 bg-white rounded-full" />
            </Link>
          </div>
          <div className="animate-bounce">
            <Link href="tel:9842391510">
              <IoIosCall />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
