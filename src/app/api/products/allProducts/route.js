import { connectToMongo } from "@/models/db";
import { Product } from "@/models/productModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Connect to MongoDB
    await connectToMongo();

    // Fetch all data from the "Product" collection
    const data = await Product.find();

    // Return the data in JSON format
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "Error while fetching data", error: error.message },
      { status: 500 }
    );
  }
}
