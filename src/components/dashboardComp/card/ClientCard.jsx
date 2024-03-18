import Link from "next/link";

const ClientCard = ({ title, link }) => {
  return (
    <div className="hover:scale-105 p-4  transition-all ease-in duration-75 flex flex-col gap-5 background shadow-lg text-white w-[300px] items-center justify-center rounded-s-md border border-solid border-blue-500">
      {/* Title */}
      <div className="flex gap-2 items-center justify-center">
        <h1 className="font-bold text-3xl">{title}</h1>
      </div>
      {/* Go through link */}
      <div className="flex gap-2 items-center justify-center mb-1">
        <button className="p-1 font-bold  text-gray-100 bg-blue-500  rounded-md">
          <Link href={`dashboard/${link}`}>Let's Go</Link>
        </button>
      </div>
    </div>
  );
};

export default ClientCard;
