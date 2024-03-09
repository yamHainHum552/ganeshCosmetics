import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
const Contactcard = () => {
  return (
    <div className=" bg-white flex  gap-5 rounded-md p-2 justify-around items-center hover:scale-105 transition-all ease-linear">
      <div className="flex flex-col gap-7 md:gap-5 items-center justify-center h-full ">
        <FaLocationDot />
        <FaPhoneAlt />
        <IoMail />
        <FaPen />
      </div>

      <div className="flex flex-col gap-4 items-center justify-center font-semibold ">
        <h1>Annapurna Line,Pathari-1,Morang</h1>
        <h1>9842391510,9825360419</h1>
        <h1>ganeshcosmetics@gmail.com</h1>
        <h1>PAN: 2834983049</h1>
      </div>
    </div>
  );
};

export default Contactcard;
