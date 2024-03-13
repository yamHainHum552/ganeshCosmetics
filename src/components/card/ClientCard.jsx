import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ClientCard = ({ name, price, productId, work, link, image }) => {
  return (
    <div className="hover:scale-105  transition-all ease-in duration-75 flex flex-col gap-5 bg-[#f2f2f2] shadow-md shadow-gray-500 text-black w-[250px] items-center justify-center rounded-md">
      {/* Card Image */}
      <div>
        <Image
          width={100}
          height={100}
          src={image}
          alt="Card Image"
          className="w-auto h-auto object-fill hover:scale-105 transition-all ease-in"
          priority="true"
        />
      </div>
      {/* Product Name */}
      <div className="flex gap-2 items-center justify-center">
        <h1 className="font-bold text-xl">{name}</h1>
      </div>
      {/* Product Price */}
      <div className="flex gap-2 items-center justify-center">
        <span className="text-xl text-gray-500 line-through ml-2">
          Rs{" "}
          {Number.isInteger(price)
            ? Math.floor(1.1 * price)
            : (1.1 * price).toFixed(2)}
        </span>
        <h1 className="font-bold text-3xl text-[#333333]">Rs {price}</h1>
      </div>
      {/* Description and Button */}
      <div className="flex gap-2 items-center justify-center mb-1">
        <button className="p-2 font-bold bg-[#001a33] text-white rounded-md">
          <Link
            href={
              link == "/dashboard/deleteProduct" ||
              link == "/dashboard/editProduct"
                ? `${link}/${productId}/${image}`
                : `${link}/${productId}`
            }
          >
            {work}
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ClientCard;
