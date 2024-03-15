import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import Link from "next/link";
const Contactcard = () => {
  return (
    <div className=" bg-white flex font-bold flex-col gap-5 rounded-md p-2 justify-center items-center hover:scale-105 transition-all ease-linear">
      <div className="flex w-full items-center justify-between lg:justify-evenly">
        <div>
          <Link
            href={
              "https://www.google.com/maps/place/GANESH+COSMETICS/@26.65769,87.559673,18z/data=!4m6!3m5!1s0x39e589d0d26f7c0b:0xfd7d53778e7afc6e!8m2!3d26.6576897!4d87.5596728!16s%2Fg%2F11f730cnxn?hl=en&entry=ttu"
            }
          >
            <FaLocationDot className="hover:animate-pulse " />
          </Link>
        </div>
        <div>
          <h1 className="font-semi-bold">Annapurna Line,Pathari-1,Morang</h1>
        </div>
      </div>
      <div className="w-full h-[1px] background"></div>

      <div className="flex w-full items-center justify-between lg:justify-evenly">
        <div>
          <Link href="tel:9842391510">
            <FaPhoneAlt className="hover:animate-pulse" />
          </Link>
        </div>
        <div>
          <h1>9842391510,9825360419</h1>
        </div>
      </div>
      <div className="w-full h-[1px] background"></div>
      <div className="flex w-full items-center justify-between lg:justify-evenly">
        <div>
          <Link href="mailto:ganeshcosmetics100@gmail.com">
            <IoMail className="hover:animate-pulse" />
          </Link>
        </div>
        <div>
          <h1>ganeshcosmetics100@gmail.com</h1>
        </div>
      </div>
      <div className="w-full h-[1px] background"></div>

      <div className="flex w-full items-center justify-between lg:justify-evenly">
        <div>
          <FaPen className="hover:animate-pulse" />
        </div>
        <div>
          <h1>PAN: 601322578</h1>
        </div>
      </div>
    </div>
  );
};

export default Contactcard;
