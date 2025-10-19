// app/api/customers/summary/route.js
import { NextResponse } from "next/server";
import { connectToMongo } from "@/models/db";
import Customer from "@/models/customer";

export async function GET() {
  try {
    await connectToMongo();

    // Fetch all customers
    const customers = await Customer.find();

    // Calculate total baaki

    return NextResponse.json({
      totalCustomers: customers.length,
      customers: customers.map((c) => ({
        id: c._id,
        name: c.name,
        phone: c.phone,
        address: c.address,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching customer summary" },
      { status: 500 }
    );
  }
}
