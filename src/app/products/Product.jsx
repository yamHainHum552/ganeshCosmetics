"use client";
import Card from "@/components/card/Card";
import React, { useState, useMemo } from "react";
import { FaArrowLeft, FaArrowRight, FaBullseye } from "react-icons/fa";

const Product = ({ products }) => {
  const [name, setName] = useState("");
  const [page, setPage] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [isSearching, setIsSearching] = useState(false);

  const filteredProducts = useMemo(() => {
    if (!name) {
      return products;
    }
    return products.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );
  }, [name, products]);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePagination = (e) => {
    setPage(e.target.value - 1);
  };
  const handlePrev = () => {
    if (page != 0) {
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    if (page !== totalPages - 1) {
      setPage(page + 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 ">
      <div className="w-[1/2] ">
        <input
          type="text"
          placeholder="Search Your Product Here"
          className="p-4 rounded-full border-none outline-none bg-base-400 w-full text-black"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            e.target.value ? setIsSearching(true) : setIsSearching(false);
          }}
        />
      </div>

      <div className="flex flex-wrap gap-5 items-center justify-center mt-12">
        {filteredProducts.length > 0 ? (
          filteredProducts
            .slice(
              page * productsPerPage,
              page * productsPerPage + productsPerPage
            )
            .map((product) => (
              <Card
                key={product._id}
                name={
                  product.name.length > 8
                    ? product.name.slice(0, 6).concat("...").toUpperCase()
                    : product.name.toUpperCase()
                }
                price={product.retailPrice}
                productId={product._id}
                work="View Product"
                link="products"
              />
            ))
        ) : (
          <p>No Results Found</p>
        )}
      </div>
      <div className="flex items-center justify-around gap-10">
        {!isSearching && (
          <div>
            <button
              className={`p-2 bg-white rounded-lg text-black font-bold ${
                page < 1 ? "bg-gray-400" : ""
              }`}
              onClick={handlePrev}
              disabled={page < 1 ? true : false}
            >
              <FaArrowLeft />
            </button>
          </div>
        )}

        <div className="flex items-center justify-around  rounded-lg bg-white">
          {!isSearching &&
            [...Array(totalPages)].map((_, i) => (
              <div key={i} className={`border border-black `}>
                <button
                  className={`p-2 text-black font-bold ${
                    page == i ? "text-blue-500" : ""
                  }`}
                  value={i + 1}
                  onClick={handlePagination}
                >
                  {i + 1}
                </button>
              </div>
            ))}
        </div>

        {!isSearching && (
          <div>
            <button
              className={`p-2 rounded-lg bg-white text-black font-bold ${
                page === totalPages - 1 && "bg-gray-400"
              }`}
              onClick={handleNext}
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
