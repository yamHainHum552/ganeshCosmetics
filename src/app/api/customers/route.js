// app/api/customers/route.js
import { NextResponse } from "next/server";
import { connectToMongo } from "@/models/db";

import Customer from "@/models/customer";

// filepath: src/app/api/customers/route.js
export async function POST(req) {
  try {
    await connectToMongo();
    console.log("Headers:", req.headers); // Add this line
    const body = await req.json();
    console.log(body);
    const customer = await Customer.create(body);
    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error adding customer" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToMongo();
    const customers = await Customer.find();
    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching customers" },
      { status: 500 }
    );
  }
}
