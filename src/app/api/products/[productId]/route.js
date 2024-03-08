import { connectToMongo } from "@/models/db";
import { Product } from "@/models/productModel";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectToMongo();
    const productId = params.productId;
    const product = await Product.findById({ _id: productId });

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
    const productId = params.productId;
    await Product.deleteOne({ _id: productId });
    revalidatePath("/dashboard/deleteProduct");

    return NextResponse.json({ result: "Product Deleted", success: true });
  } catch (error) {
    return NextResponse.json({
      result: "Error deleting the product",
      success: false,
    });
  }
}
export async function PUT(req, { params }) {
  try {
    await connectToMongo();
    const payload = await req.json();
    const productId = params.productId;
    const result = await Product.findOneAndUpdate({ _id: productId }, payload);
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
