"use client";
import Card from "@/components/card/Card";
import Load from "@/components/loading/Load";
import React, { useState, useMemo, useEffect } from "react";

const Product = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/products`
      );
      if (!data.ok) {
        throw new Error("Cannot find products");
      }
      const products = await data.json();
      setLoading(false);
      setProducts(products);
    }
    getProducts();
  }, []);
  const filteredProducts = useMemo(() => {
    if (!name) {
      return products;
    }
    return products.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );
  }, [name, products]);

  return (
    <div className="flex flex-col items-center gap-5 ">
      <div className="w-[1/2] ">
        <input
          type="text"
          placeholder="Search For Products"
          className="p-4 rounded-full border-none outline-none bg-base-400 w-full text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {!loading ? (
        <div className="flex flex-wrap gap-5 items-center justify-center mt-12">
          {filteredProducts.length > 0 ? (
            filteredProducts
              .reverse()
              .map((product) => (
                <Card
                  key={product._id}
                  name={
                    product.name.length > 14
                      ? product.name.slice(0, 10).concat("...").toUpperCase()
                      : product.name.toUpperCase()
                  }
                  price={product.retailPrice}
                  image={product.image}
                  productId={product._id}
                  work="Delete"
                  link="/dashboard/deleteProduct"
                />
              ))
          ) : (
            <p>No Results Found</p>
          )}
        </div>
      ) : (
        <Load />
      )}
    </div>
  );
};

export default Product;
