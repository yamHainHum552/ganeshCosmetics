// app/api/transactions/[id]/route.js
import { NextResponse } from "next/server";
import { connectToMongo } from "@/models/db";
import Customer from "@/models/customer";
import Transaction from "@/models/Transaction";

// UPDATE TRANSACTION
export async function PUT(req, { params }) {
  try {
    await connectToMongo();
    const { id } = await params;
    const body = await req.json();

    const oldTxn = await Transaction.findById(id);
    if (!oldTxn) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    // Reverse old transaction impact on customer
    const customer = await Customer.findById(oldTxn.customer);
    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    // Update with new values
    const updatedTxn = await Transaction.findByIdAndUpdate(id, body, {
      new: true,
    });

    await customer.save();

    return NextResponse.json(updatedTxn);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating transaction" },
      { status: 500 }
    );
  }
}

// DELETE TRANSACTION
export async function DELETE(req, { params }) {
  try {
    await connectToMongo();
    const { id } = await params;

    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    // Reverse effect on customer
    const customer = await Customer.findById(transaction.customer);

    return NextResponse.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting transaction" },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  try {
    await connectToMongo();

    const { id } = await params; // ✅ use id consistently

    const transactions = await Transaction.find({ customer: id })
      .populate("customer")
      .sort({ date: -1 });

    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching customer transactions" },
      { status: 500 }
    );
  }
}
