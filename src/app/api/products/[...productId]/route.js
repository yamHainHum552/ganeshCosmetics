import { connectToMongo } from "@/models/db";
import { Product } from "@/models/productModel";
import { deleteImage } from "@/utils/cloudinary";
import { uploadOnCloudinary } from "@/utils/cloudinary";
import { revalidatePath } from "next/cache";

import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectToMongo();
    const productId = params.productId[0];

    const product = await Product.findById(productId);

    return NextResponse.json({ result: product, success: true });
  } catch (error) {
    return NextResponse.json({
      result: "Error fetching the product",
      success: false,
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectToMongo();

    const productId = params.productId[0];
    const length = params.productId.length;
    const id = params.productId[length - 1];

    if (!(await Product.findById({ _id: productId }))) {
      return NextResponse({ result: "Product doesn't exists", success: false });
    }
    await Product.findByIdAndDelete({ _id: productId });
    deleteImage(id);

    revalidatePath("/dashboard/deleteProduct");

    return NextResponse.json({ result: "Product Deleted", success: true });
  } catch (error) {
    return NextResponse.json({
      result: "Error deleting the product",
      success: false,
    });
  }
}

// Update product
export async function PUT(req, { params }) {
  try {
    await connectToMongo();
    const payload = await req.formData();

    const productId = params.productId[0];
    const length = params.productId.length;
    const id = params.productId[length - 1];

    // Form data
    const imgFile = payload.get("image");
    const name = payload.get("name");
    const retailPrice = Number(payload.get("retailPrice"));
    const wholesalePrice = Number(payload.get("wholesalePrice"));
    const category = payload.get("category");
    const description = payload.get("description");

    let image = imgFile;
    // Upload on Cloudinary
    if (typeof imgFile !== "string") {
      const imageResponse = await uploadOnCloudinary(imgFile, "products");
      image = imageResponse?.secure_url;
    }

    const mongoData = {
      name,
      image,
      retailPrice,
      wholesalePrice,
      category,
      description,
    };

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return NextResponse.json({
        message: "No Product Found to edit",
        success: false,
      });
    }

    const result = await Product.findByIdAndUpdate(productId, mongoData);

    await deleteImage(id);

    if (result) {
      revalidatePath("/dashboard/editProduct");

      return NextResponse.json({ result: "Product Updated", success: true });
    } else {
      return NextResponse.json({
        result: "Product not found",
        success: false,
      });
    }
  } catch (error) {
    return NextResponse.json({
      result: "Error editing the product",
      success: false,
    });
  }
}
