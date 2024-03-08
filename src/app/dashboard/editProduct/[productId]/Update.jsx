"use client";
// import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const Update = ({ product }) => {
  const [name, setName] = useState(product.name);
  const [retailPrice, setretailPrice] = useState(product.retailPrice);
  const [wholesalePrice, setWholesalePrice] = useState(product.wholesalePrice);
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description);

  const handleEdit = async (e) => {
    // const router = useRouter();
    e.preventDefault();
    const data = await fetch(
      `http://localhost:3000/api/products/${product._id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          name,
          retailPrice,
          wholesalePrice,
          category,
          description,
        }),
      }
    );
    if (!data.ok) {
      toast.error("Failed to update the product");
    } else {
      toast.success("Updated Successfully");
      // router.push("/dashboard/editProduct");
    }
  };

  return (
    <div className="flex flex-col md:flex-row  items-center justify-center ">
      {/* Add Product */}
      <div className="flex flex-col gap-4 items-center">
        <h1 className="font-bold text-3xl">Edit Product</h1>
        <form
          action=""
          className="flex flex-col gap-5 items-center justify-center text-black"
        >
          <input
            type="text"
            placeholder="Product Name"
            className="p-4 rounded-md border-none outline-none bg-base-400 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Product Price"
            className="p-4 rounded-md border-none outline-none bg-base-400 w-full"
            value={retailPrice}
            onChange={(e) => setretailPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Wholesale Price"
            className="p-4 rounded-md border-none outline-none bg-base-400 w-full"
            value={wholesalePrice}
            onChange={(e) => setWholesalePrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Category"
            className="p-4 rounded-md border-none outline-none bg-base-400 w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <textarea
            name=""
            id=""
            cols="30"
            rows="6"
            placeholder="Description"
            className="p-4 rounded-md border-none outline-none bg-base-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button
            className="btn btn-primary text-black font-bold bg-white p-2  rounded-md"
            onClick={handleEdit}
          >
            Edit Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
