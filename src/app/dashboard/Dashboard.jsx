"use client";
import Card from "@/components/dashboardComp/card/Card";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getProducts() {
      setIsLoading(true);
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/products`
      );
      if (!data.ok) {
        toast.error("Error fetching products");
      }
      const products = await data.json();
      setIsLoading(false);
      setProducts(products);
    }
    getProducts();
  }, []);
  return (
    <div className="flex flex-col items-center justify-around gap-10">
      <div className="flex items-center">
        <h1 className="text-3xl md:text-5xl font-bold">
          Total Products:{" "}
          <span>{isLoading ? "..." : `${products.length}`}</span>
        </h1>
      </div>
      <div className="  flex flex-wrap gap-5 items-center justify-center ">
        {/* Add Product */}
        <Card title="Add Product" link="addProduct" />
        {/* Update Product */}
        <Card title="Edit Product" link="editProduct" />
        {/* Delete Product */}
        <Card title="Delete Product" link="deleteProduct" />
      </div>
    </div>
  );
};

export default Dashboard;
