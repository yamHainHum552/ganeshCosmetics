import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaCopy } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
const Contactcard = () => {
  const [pan, setPan] = useState("601322578");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pan);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className=" bg-white flex font-bold flex-col gap-5 rounded-md p-2 justify-center items-center hover:scale-105 transition-all ease-linear">
      <div className="flex w-full items-center justify-between lg:justify-evenly">
        <div className="w-full">
          <Link
            href={
              "https://www.google.com/maps/place/GANESH+COSMETICS/@26.65769,87.559673,18z/data=!4m6!3m5!1s0x39e589d0d26f7c0b:0xfd7d53778e7afc6e!8m2!3d26.6576897!4d87.5596728!16s%2Fg%2F11f730cnxn?hl=en&entry=ttu"
            }
            className="flex items-center justify-around"
          >
            <FaLocationDot className="hover:animate-pulse " />
            <h1 className="font-semi-bold">Annapurna Line,Pathari-1,Morang</h1>
          </Link>
        </div>
      </div>
      <div className="w-full h-[1px] background"></div>

      <div className="flex w-full items-center justify-between lg:justify-evenly">
        <div className="w-full">
          <Link
            href="tel:9842391510"
            className="flex items-center justify-around"
          >
            <FaPhoneAlt className="hover:animate-pulse" />
            <h1>9842391510,9825360419</h1>
          </Link>
        </div>
      </div>
      <div className="w-full h-[1px] background"></div>
      <div className="flex w-full items-center justify-between lg:justify-evenly">
        <div className="w-full">
          <Link
            href="mailto:ganeshcosmetics100@gmail.com"
            className="flex items-center justify-around"
          >
            <IoMail className="hover:animate-pulse" />
            <h1>ganeshcosmetics100@gmail.com</h1>
          </Link>
        </div>
      </div>
      <div className="w-full h-[1px] background"></div>

      <div className="flex w-full items-center justify-between lg:justify-evenly">
        <div
          className="flex items-center justify-around w-full cursor-pointer"
          onClick={handleCopy}
        >
          <FaCopy className="hover:animate-pulse" />
          <h1>PAN: {pan}</h1>
        </div>
      </div>
    </div>
  );
};

export default Contactcard;
