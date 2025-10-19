// app/api/transactions/route.js
import { NextResponse } from "next/server";
import { connectToMongo } from "@/models/db";
import Customer from "@/models/customer";
import Transaction from "@/models/Transaction";

export async function POST(req) {
  try {
    await connectToMongo();
    const { customerId, amount, type, date } = await req.json();
    console.log(customerId);

    const transaction = await Transaction.create({
      customer: customerId,
      amount,
      type,
      date,
    });
    console.log(transaction);

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    await customer.save();

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error adding transaction" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToMongo();
    const transactions = await Transaction.find().populate("customer");
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching transactions" },
      { status: 500 }
    );
  }
}
