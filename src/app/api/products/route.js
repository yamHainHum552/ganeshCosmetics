export const dynamic = "force-dynamic";
import { connectToMongo } from "@/models/db";
import { Product } from "@/models/productModel";
import { uploadOnCloudinary } from "@/utils/cloudinary";

import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    await connectToMongo();
    const payload = await req.formData();
    // const imagePath = (await req.file) ? req.file.path : null;

    const imgFile = payload.get("image");
    const name = payload.get("name");
    const retailPrice = payload.get("retailPrice");
    const wholesalePrice = payload.get("wholesalePrice");
    const category = payload.get("category");
    const description = payload.get("description");
    // Upload on cloudinary
    const imageResponse = await uploadOnCloudinary(imgFile, "products");
    const image = imageResponse?.secure_url;
    const mongoData = {
      name,
      image,
      retailPrice,
      wholesalePrice,
      category,
      description,
    };

    const data = new Product(mongoData);
    await data.save();
    return NextResponse.json({ message: "Added Successfully", success: true });
  } catch (error) {
    return NextResponse.error("Error while adding products", 500);
  }
}

export async function GET(req) {
  try {
    await connectToMongo();
    const data = await Product.find();

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.error("Error while adding products", 500);
  }
}
