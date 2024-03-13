"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [retailPrice, setretailPrice] = useState("");
  const [wholesalePrice, setWholesalePrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const addProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("retailPrice", retailPrice);
    formData.append("wholesalePrice", wholesalePrice);
    formData.append("category", category);
    formData.append("description", description);
    console.log(formData);
    let product = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/products`,
      {
        method: "POST",
        body: formData,
      }
    );

    product = await product.json();
    if (product.success) {
      toast.success("Added Successfully");
      setretailPrice("");
      setWholesalePrice("");
      setName("");
      setDescription("");
      setCategory("");
      setImage(null);
      setIsLoading(false);
    } else
      toast.error("Failed to add Product", {
        autoClose: 1000,
      });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (file.size < 1014 * 1024) {
      if (
        file.type == "image/jpeg" ||
        file.type == "image/png" ||
        file.type == "image/jpg"
      ) {
        setImage(file);
        toast.success("Image Accepted");
      } else {
        toast.error("Only JPEG/JPG or PNG is accepted.");
      }
    } else toast.error("Image should be less than 1MB");
  };

  return (
    <div className="flex flex-col md:flex-row  items-center justify-center ">
      {/* Add Product */}
      <div className="flex flex-col gap-4 items-center">
        <h1 className="font-bold text-3xl">Add Product</h1>
        <form
          action=""
          autoComplete="off"
          onSubmit={addProduct}
          className="flex flex-col gap-5 items-center justify-center text-black"
        >
          <input
            type="text"
            placeholder="Product Name"
            className="p-4 rounded-md border-none outline-none bg-base-400 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex items-center justify-center gap-5">
            <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
              Select Photo
              <input
                className="hidden"
                type="file"
                accept=".jpeg, .png, .jpg"
                onChange={handleFileUpload}
              />
            </label>
            <h1 className="font-semi-bold text-white">
              {image
                ? image.name.substring(0, 3) + "..." + image.name.slice(-4)
                : "Not Uploaded Yet"}
            </h1>
          </div>

          <input
            type="text"
            placeholder="Product Price"
            className="p-4 rounded-md border-none outline-none bg-base-400 w-full"
            value={retailPrice}
            onChange={(e) => setretailPrice(e.target.value)}
          />
          <input
            type="text"
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
            className=" text-white font-bold bg-blue-600 hover:bg-blue-700 p-2  rounded-md"
            type="submit"
          >
            {isLoading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
