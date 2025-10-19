// app/api/transactions/summary/route.js
import { NextResponse } from "next/server";
import { connectToMongo } from "@/models/db";
import Transaction from "@/models/Transaction";

export async function GET(req) {
  try {
    await connectToMongo();

    const url = new URL(req.url);
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");

    // Build filter for date range
    let filter = {};
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }

    const transactions = await Transaction.find(filter).lean();

    let totalbaki = 0;
    let totalChukta = 0;

    transactions.forEach((t) => {
      if (t.type === "baki") {
        totalbaki += t.amount;
      } else if (t.type === "chukta") {
        totalChukta += t.amount;
      }
    });

    return NextResponse.json({
      totalTransactions: transactions.length,
      totalbaki,
      totalChukta,
      netOutstanding: totalbaki - totalChukta,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching transactions summary" },
      { status: 500 }
    );
  }
}
