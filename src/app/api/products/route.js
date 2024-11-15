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

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 0;
    const limit = parseInt(searchParams.get("limit")) || 50;

    const skip = page * limit;

    const data = await Product.find().skip(skip).limit(limit);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error while fetching products" },
      { status: 500 }
    );
  }
}
