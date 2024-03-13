"use client";
// import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Update = ({ product, id }) => {
  const imageName =
    product.image.split("/")[product.image.split("/").length - 1];

  const [name, setName] = useState(product.name);
  const [retailPrice, setretailPrice] = useState(product.retailPrice);
  const [wholesalePrice, setWholesalePrice] = useState(product.wholesalePrice);
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleEdit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("retailPrice", retailPrice);
    formData.append("wholesalePrice", wholesalePrice);
    formData.append("category", category);
    formData.append("description", description);
    let data = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/products/${product._id}/${id}`,
      {
        method: "PUT",
        body: formData,
      }
    );
    data = await data.json();
    console.log(data);

    if (!data.success) {
      toast.error("Failed to update the product");
    } else {
      setIsUpdating(false);
      toast.success("Updated Successfully");
      router.push("/dashboard/editProduct");
    }
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
        <h1 className="font-bold text-3xl md:text-5xl">Edit Product</h1>
        <form
          action=""
          onSubmit={handleEdit}
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
              {typeof image === "object" && image !== null
                ? image.name.substring(0, 3) + "..." + image.name.slice(-4)
                : imageName.substring(0, 3) + "..." + imageName.slice(-4)}
            </h1>
          </div>

          <input
            type="text"
            placeholder="Retail Price"
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
            {isUpdating ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
