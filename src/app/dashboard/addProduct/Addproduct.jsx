"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [retailPrice, setretailPrice] = useState("");
  const [wholesalePrice, setWholesalePrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const addProduct = async (e) => {
    e.preventDefault();
    let product = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      body: JSON.stringify({
        name,
        retailPrice,
        wholesalePrice,
        category,
        description,
      }),
    });
    product = await product.json();

    if (product.result) {
      toast.success("Added Successfully");
      setretailPrice("");
      setWholesalePrice("");
      setName("");
      setDescription("");
      setCategory("");
    } else
      toast.error("Failed to add Product", {
        autoClose: 1000,
      });
  };

  return (
    <div className="flex flex-col md:flex-row  items-center justify-center ">
      {/* Add Product */}
      <div className="flex flex-col gap-4 items-center">
        <h1 className="font-bold text-3xl">Add Product</h1>
        <form
          action=""
          autoComplete="off"
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
            onClick={addProduct}
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
