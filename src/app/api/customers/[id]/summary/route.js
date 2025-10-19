// app/api/customers/[id]/summary/route.js
import { NextResponse } from "next/server";
import { connectToMongo } from "@/models/db";
import Customer from "@/models/customer";
import Transaction from "@/models/Transaction";

export async function GET(req, { params }) {
  try {
    await connectToMongo();
    const { id } = await params;

    const url = new URL(req.url);
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");

    const customer = await Customer.findById(id);
    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    // Build filter for transactions
    let filter = { customer: id };
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }

    // Fetch filtered transactions
    const transactions = await Transaction.find(filter)
      .sort({ date: -1 })
      .lean();

    return NextResponse.json({
      id: customer._id,
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      transactions: transactions.map((t) => ({
        id: t._id,
        amount: t.amount,
        type: t.type,
        date: t.date,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching customer summary" },
      { status: 500 }
    );
  }
}
