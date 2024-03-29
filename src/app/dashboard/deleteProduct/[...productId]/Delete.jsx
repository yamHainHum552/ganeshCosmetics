"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
const Delete = ({ result, id }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/products/${result._id}/${id}`,
      {
        method: "DELETE",
        cache: "no-cache",
      }
    );
    if (!data.ok) {
      toast.error("Failed to delete the product");
    } else {
      toast.success("Deleted Successfully");
      router.push("/dashboard/deleteProduct");
    }
  };
  const handleBack = () => {
    router.push("/dashboard/deleteProduct");
  };

  return (
    <div className="flex flex-col gap-5 w-full h-full items-center justify-center">
      {/* Go Back */}
      <div className="flex md:hidden gap-5 items-center justify-center">
        <h1 className="text-xl font-bold">Go Back:</h1>
        <FaArrowLeft className="font-bold text-xl" onClick={handleBack} />
      </div>
      {/* Delete Product */}
      <div className="flex items-center gap-4">
        <h1 className="text-white text-xl font-bold">Click here to Delete:</h1>
        <button
          onClick={handleDelete}
          className="bg-white font-bold p-2 text-black  rounded-md"
        >
          Delete
        </button>
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
        />
      </div>
      {/* Price */}
      <div className="flex gap-2 items-center justify-center">
        <h1 className="font-bold text-3xl">Price -</h1>
        <h1 className="font-bold text-xl">{result.retailPrice}</h1>
      </div>
      <div>
        <p>{result.description}</p>
      </div>
    </div>
  );
};

export default Delete;
