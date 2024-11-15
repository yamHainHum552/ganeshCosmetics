"use client";
import Card from "@/components/dashboardComp/card/Card";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productsPerPage] = useState(50); // Assuming 50 products per page

  useEffect(() => {
    async function getProducts() {
      setIsLoading(true);
      try {
        let allProducts = [];
        let currentPage = 0;
        let moreProducts = true;

        while (moreProducts) {
          const data = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER}/api/products?page=${currentPage}&limit=${productsPerPage}`
          );
          if (!data.ok) {
            throw new Error("Error fetching products");
          }
          const pageProducts = await data.json();
          allProducts = [...allProducts, ...pageProducts];
          moreProducts = pageProducts.length === productsPerPage;
          currentPage++;
        }

        setProducts(allProducts);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getProducts();
  }, [productsPerPage]);

  return (
    <div className="flex flex-col items-center justify-around gap-10">
      <div className="flex items-center">
        <h1 className="text-3xl md:text-5xl font-bold">
          Total Products:{" "}
          <span>{isLoading ? "..." : `${products.length}`}</span>
        </h1>
      </div>
      <div className="flex flex-wrap gap-5 items-center justify-center">
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
