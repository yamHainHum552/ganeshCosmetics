import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
const Contactcard = () => {
  return (
    <div className=" bg-white flex font-bold flex-col gap-5 rounded-md p-2 justify-center items-center hover:scale-105 transition-all ease-linear">
      <div className="flex w-full items-center justify-between lg:justify-evenly">
        <div>
          <FaLocationDot className="hover:animate-pulse " />
        </div>
        <div>
          <h1 className="font-semi-bold">Annapurna Line,Pathari-1,Morang</h1>
        </div>
      </div>
      <div className="w-full h-[1px] background"></div>

      <div className="flex w-full items-center justify-between lg:justify-evenly">
        <div>
          <FaPhoneAlt className="hover:animate-pulse" />
        </div>
        <div>
          <h1>9842391510,9825360419</h1>
        </div>
      </div>
      <div className="w-full h-[1px] background"></div>
      <div className="flex w-full items-center justify-between lg:justify-evenly">
        <div>
          <IoMail className="hover:animate-pulse" />
        </div>
        <div>
          <h1>ganeshcosmetics@gmail.com</h1>
        </div>
      </div>
      <div className="w-full h-[1px] background"></div>

      <div className="flex w-full items-center justify-between lg:justify-evenly">
        <div>
          <FaPen className="hover:animate-pulse" />
        </div>
        <div>
          <h1>PAN: 2834983049</h1>
        </div>
      </div>
    </div>
  );
};

export default Contactcard;
