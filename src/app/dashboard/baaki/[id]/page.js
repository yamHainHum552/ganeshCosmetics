"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, PlusCircle, Pencil, Trash2, Loader2 } from "lucide-react"; // 👈 Added Loader2 icon
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";

export default function CustomerPage() {
  const { id } = useParams();
  const router = useRouter();

  const [customer, setCustomer] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [totalBaaki, setTotalBaaki] = useState(0);
  const [loading, setLoading] = useState(true); // 👈 added loading state

  // dialog states
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    amount: "",
    type: "baki",
    date: new Date().toLocaleDateString("ne-NP").slice(0, 10),
  });

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      await Promise.all([fetchCustomer(), fetchTransactions()]);
      setLoading(false);
    })();
  }, [id]);

  const fetchCustomer = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}/api/customers/${id}/summary`
      );
      setCustomer(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}/api/transactions/${id}`
      );
      const txns = Array.isArray(res.data) ? res.data : [];
      setTransactions(txns);

      const total = txns.reduce(
        (a, c) =>
          a + (c.type === "baki" ? Number(c.amount) : -Number(c.amount)),
        0
      );
      setTotalBaaki(total);
    } catch (err) {
      console.error(err);
      setTransactions([]);
      setTotalBaaki(0);
    }
  };

  const handleSave = async () => {
    try {
      const isoDate =
        form.date && !isNaN(Date.parse(form.date))
          ? new Date(form.date).toISOString()
          : new Date().toISOString();

      const payload = {
        amount: Number(form.amount),
        type: form.type,
        date: isoDate,
        customerId: id,
      };

      let res;
      if (editing) {
        res = await axios.put(
          `${process.env.NEXT_PUBLIC_SERVER}/api/transactions/${editing._id}`,
          payload
        );
        setTransactions((prev) =>
          prev.map((txn) => (txn._id === editing._id ? res.data : txn))
        );
      } else {
        res = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER}/api/transactions`,
          payload
        );
        setTransactions((prev) => [...prev, res.data]);
      }

      setOpen(false);
      setForm({
        amount: "",
        type: "baki",
        date: new Date().toISOString().slice(0, 10),
      });
      setEditing(null);
      fetchCustomer();
    } catch (err) {
      console.error("Transaction save failed:", err.response?.data || err);
    }
  };

  const handleDelete = async (txnId) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER}/api/transactions/${txnId}`
      );
      setTransactions((prev) => prev.filter((txn) => txn._id !== txnId));
      fetchCustomer();
    } catch (err) {
      console.error(err);
    }
  };

  // 👇 Loader display before content
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-700">
        <Loader2 className="animate-spin w-10 h-10 text-indigo-600 mb-4" />
        <p className="text-lg font-semibold">Loading transactions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12 bg-gradient">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Back Button */}
        <Button
          variant="outline"
          className="mb-4 bg-white text-gray-800 hover:bg-gray-700 hover:text-white font-bold"
          onClick={() => router.push("/dashboard/baaki")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        {/* Customer Info */}
        {customer && (
          <Card className="shadow-lg w-full overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-violet-700 text-white p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-2xl md:text-3xl font-bold">
                    {customer.name}
                  </CardTitle>
                  <p className="text-sm md:text-base">
                    Phone: {customer.phone}
                  </p>
                  <p className="text-sm md:text-base">
                    Address: {customer.address}
                  </p>
                </div>
                <p className="mt-4 md:mt-0 text-lg font-semibold bg-white text-indigo-700 px-4 py-2 rounded-lg shadow">
                  Total Baaki: Rs. {totalBaaki}
                </p>
              </div>
            </CardHeader>
          </Card>
        )}

        {/* Transactions Table */}
        <Card className="shadow-lg w-full bg-gray-900 text-gray-800">
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6">
            <CardTitle className="text-xl md:text-2xl font-bold ">
              Transaction History
            </CardTitle>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={() => {
                setEditing(null);
                setForm({
                  amount: "",
                  type: "baki",
                  date: new Date().toISOString().slice(0, 10),
                });
                setOpen(true);
              }}
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Add Transaction
            </Button>
          </CardHeader>
          <CardContent className="p-4 overflow-x-auto">
            <Table className="w-full border border-gray-800 rounded-lg">
              <TableHeader>
                <TableRow className="bg-gray-800 text-gray-300">
                  <TableHead className="whitespace-nowrap">Date</TableHead>
                  <TableHead className="whitespace-nowrap">Amount</TableHead>
                  <TableHead className="whitespace-nowrap">Type</TableHead>
                  <TableHead className="text-right whitespace-nowrap">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.length > 0 ? (
                  transactions.map((txn) => (
                    <TableRow
                      key={txn._id}
                      className="hover:bg-gray-900 transition"
                    >
                      <TableCell>
                        {txn.nepaliDate ??
                          (txn.date
                            ? new Date(txn.date).toLocaleDateString()
                            : "-")}
                      </TableCell>
                      <TableCell>Rs. {txn.amount}</TableCell>
                      <TableCell className="capitalize">{txn.type}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          size="icon"
                          className="bg-blue-500 hover:bg-blue-600 text-white"
                          onClick={() => {
                            setEditing(txn);
                            setForm({
                              amount: txn.amount,
                              type: txn.type,
                              // prefer nepaliDate if saved, otherwise convert existing date to ISO for the picker
                              date:
                                txn.nepaliDate ??
                                (txn.date
                                  ? new Date(txn.date)
                                      .toISOString()
                                      .slice(0, 10)
                                  : new Date().toISOString().slice(0, 10)),
                            });
                            setOpen(true);
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          className="bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => handleDelete(txn._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-6 text-gray-400"
                    >
                      No transactions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg w-full">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Transaction" : "Add Transaction"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="date" className="block mb-1 font-medium">
                Date
              </Label>
              <div className="w-full">
                <NepaliDatePicker
                  inputClassName="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                  value={form.date}
                  onChange={(value) => {
                    setForm({
                      ...form,
                      date: value, // English date
                      // Nepali equivalent
                    });
                  }}
                  options={{ calenderLocale: "ne" }}
                />
              </div>
            </div>

            <div>
              <Label>Amount</Label>
              <Input
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />
            </div>
            <div>
              <Label>Type</Label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full border rounded-md p-2 text-black"
              >
                <option value="baki">Baki</option>
                <option value="chukta">Chukta</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                className="bg-gray-200 hover:bg-gray-300 text-black"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={handleSave}
              >
                {editing ? "Update" : "Save"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
