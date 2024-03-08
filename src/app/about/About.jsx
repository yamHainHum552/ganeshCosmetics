import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <div className="flex flex-col  justify-between gap-5 md:gap-10 items-center">
      {/* Picture */}
      <div className="relative w-full md:w-1/2 h-full flex items-center justify-center  hover:scale-105 transition-all ease-linear">
        <Image src="/about.jpg" alt="About Img" width={800} height={700} />
      </div>
      {/* Content */}
      <div className="w-full md:w-1/2  flex justify-center items-center flex-col gap-10 ">
        <h1 className="text-5xl md:text-7xl font-bold text-white">About</h1>
        <p className="text-[#b7bac1]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum quaerat
          fugit officia eos fugiat dicta vel qui, quae, saepe consectetur
          accusantium labore nesciunt asperiores fuga molestiae earum, tempora
          ipsam! Sint.
        </p>
      </div>
    </div>
  );
};

export default About;
