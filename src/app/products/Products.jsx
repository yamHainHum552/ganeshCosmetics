"use client";
import Card from "@/components/card/Card";
import Load from "@/components/loading/Load";
import React, { useState, useMemo, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

const Products = () => {
  const [name, setName] = useState("");
  const [page, setPage] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(50);
  const [isSearching, setIsSearching] = useState(false);
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
          type="search"
          placeholder="Search for Products"
          className="p-4 rounded-full border-none outline-none bg-base-400 w-full text-black"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            e.target.value ? setIsSearching(true) : setIsSearching(false);
          }}
        />
      </div>

      {!isLoading ? (
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
                    product.name.length > 15
                      ? product.name.slice(0, 10).concat("...").toUpperCase()
                      : product.name.toUpperCase()
                  }
                  price={product.retailPrice}
                  productId={product._id}
                  image={product.image}
                  work="View Product"
                  link="products"
                />
              ))
          ) : (
            <p>No Results Found</p>
          )}
        </div>
      ) : (
        <Load />
      )}
      {products.length > 0 && (
        <div className="flex items-center justify-around gap-10">
          {!isSearching && page >= 1 && (
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

          <div className="flex items-center justify-around  rounded-lg bg-white text-black">
            {!isSearching &&
              [...Array(totalPages)].map((_, i) => (
                <div
                  key={i}
                  className={`border border-black ${
                    page == i ? "bg-gray-400 text-black" : ""
                  } `}
                >
                  <button
                    className={`p-2  font-bold }`}
                    value={i + 1}
                    onClick={handlePagination}
                  >
                    {i + 1}
                  </button>
                </div>
              ))}
          </div>

          {!isSearching && page < totalPages - 1 && (
            <div>
              <button
                className={`p-2 rounded-lg bg-white text-black font-bold `}
                onClick={handleNext}
              >
                <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
