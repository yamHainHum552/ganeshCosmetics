"use client";
import Card from "@/components/card/Card";
import React, { useState, useMemo } from "react";

const Product = ({ products }) => {
  const [name, setName] = useState("");
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
          placeholder="Search Your Product Here"
          className="p-4 rounded-full border-none outline-none bg-base-400 w-full text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-5 items-center justify-center mt-12">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card
              key={product._id}
              name={
                product.name.length > 8
                  ? product.name.slice(0, 6).concat("...").toUpperCase()
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
    </div>
  );
};

export default Product;
