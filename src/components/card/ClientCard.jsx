import React from "react";
import Image from "next/image";
import Link from "next/link";

const ClientCard = ({ name, price, productId, work, link }) => {
  return (
    <div className="hover:scale-105 transition-all ease-in duration-75 flex flex-col gap-5 bg-white shadow-lg text-black w-[250px] items-center justify-center rounded-md">
      {/* Card Image */}
      <div>
        <Image width={200} height={100} src={"/contact.png"} alt="Card Image" />
      </div>
      {/* Naming and Price */}
      <div className="flex gap-2 items-center justify-center">
        <h1 className="font-bold text-3xl">{name}</h1>
        <span className="font-semi-bold text-xl">(Rs{price})</span>
      </div>
      {/* Description and Button */}
      <div className="flex gap-2 items-center justify-center mb-1">
        <button className="p-2 font-bold background text-white rounded-md">
          <Link href={`${link}/${productId}`}>{work}</Link>
        </button>
      </div>
    </div>
  );
};

export default ClientCard;
