"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pencil,
  Trash2,
  PlusCircle,
  Search,
  SquareArrowRight,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function BaakiDashboard() {
  const [baakis, setBaakis] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // Fetch baaki list
  useEffect(() => {
    fetchBaakis();
  }, []);

  const fetchBaakis = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}/api/customers`
      );
      setBaakis(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editing) {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_SERVER}/api/customers/${editing._id}`,
          form
        );
        setBaakis((prev) =>
          prev.map((b) => (b._id === editing._id ? res.data : b))
        );
      } else {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER}/api/customers`,
          form
        );
        setBaakis((prev) => [...prev, res.data]);
      }
      setOpen(false);
      setForm({ name: "", phone: "", address: "" });
      setEditing(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER}/api/customers/${id}`
      );
      setBaakis((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredBaakis = baakis.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-4 md:p-10">
      <Card className="max-w-7xl mx-auto shadow-2xl border-0 rounded-2xl overflow-hidden">
        {/* Header */}
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-2xl p-6 gap-4">
          <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-center md:text-left">
            बाँकी
          </CardTitle>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
            {/* Search box */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-2 top-2.5 text-gray-400" />
              <Input
                placeholder="Search customer..."
                className="pl-9 bg-white text-gray-900 w-full sm:w-64 rounded-lg focus:ring-2 focus:ring-purple-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Add button */}
            <Button
              className="bg-white text-purple-700 font-semibold hover:bg-gray-100 rounded-lg flex items-center justify-center"
              onClick={() => {
                setEditing(null);
                setForm({ name: "", phone: "", address: "" });
                setOpen(true);
              }}
            >
              <PlusCircle className="w-5 h-5 mr-2" /> Add Customer
            </Button>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-4 md:p-8 bg-white overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-500">
              <Loader2 className="animate-spin w-8 h-8 mb-3 text-purple-600" />
              <p>Loading customers...</p>
            </div>
          ) : (
            <Table className="min-w-full text-sm md:text-base">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>Customer</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBaakis.length > 0 ? (
                  filteredBaakis.map((item) => (
                    <TableRow
                      key={item._id}
                      role="button"
                      tabIndex={0}
                      className="hover:bg-gray-50 cursor-pointer border-b transition-colors"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          router.push(`/dashboard/baaki/${item._id}`);
                      }}
                    >
                      <TableCell className="font-semibold text-gray-800 break-words max-w-[150px] sm:max-w-none">
                        {item.name}
                      </TableCell>
                      <TableCell className="text-gray-800 break-words">
                        {item.phone}
                      </TableCell>
                      <TableCell className="text-gray-800 break-words max-w-[180px] sm:max-w-none">
                        {item.address}
                      </TableCell>
                      <TableCell
                        className="text-right space-x-2 flex flex-wrap justify-end gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="hover:bg-purple-100 border-gray-300"
                          onClick={() => {
                            setEditing(item);
                            setForm(item);
                            setOpen(true);
                          }}
                        >
                          <Pencil className="w-5 h-5 text-purple-600" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="hover:bg-red-700"
                          onClick={() => handleDelete(item._id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="hover:bg-indigo-100 border-gray-300"
                          onClick={() =>
                            router.push(`/dashboard/baaki/${item._id}`)
                          }
                        >
                          <SquareArrowRight className="w-5 h-5 text-indigo-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-10 text-gray-500 text-base md:text-lg"
                    >
                      No baaki records found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-xl w-[90%] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-gray-900 font-bold">
              {editing ? "Edit Customer" : "Add Customer"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Customer Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Address</Label>
              <Input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="mt-1"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white"
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
