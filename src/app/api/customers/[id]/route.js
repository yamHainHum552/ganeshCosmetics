// app/api/customers/[id]/route.js
import { NextResponse } from "next/server";
import { connectToMongo } from "@/models/db";
import Customer from "@/models/customer";

export async function PUT(req, { params }) {
  try {
    await connectToMongo();
    const { id } = await params;
    const body = await req.json();

    const customer = await Customer.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating customer" },
      { status: 500 }
    );
  }
}

// DELETE CUSTOMER
export async function DELETE(req, { params }) {
  try {
    await connectToMongo();
    const { id } = await params;

    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Customer deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting customer" },
      { status: 500 }
    );
  }
}
