import { connectToMongo } from "@/models/db";
import { Product } from "@/models/productModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongo();
    const payload = await req.json();
    const data = new Product(payload);
    const result = await data.save();

    return NextResponse.json({ result });
  } catch (error) {
    console.log(error);
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
