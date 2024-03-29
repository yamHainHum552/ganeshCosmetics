"use client";
import Card from "@/components/card/Card";
import GoToTop from "@/components/gototop/GoToTop";
import Load from "@/components/loading/Load";
import React, { useState, useMemo, useEffect, useRef } from "react";
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
  }, [name, products])
    .slice()
    .reverse();

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
  const inputRef = useRef();
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      inputRef.current.blur();
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 ">
      <GoToTop />
      <div className="w-[1/2] ">
        <input
          type="search"
          placeholder="Search for Products"
          className="p-4 rounded-full border-none outline-none bg-base-400 w-full text-black"
          value={name}
          ref={inputRef}
          onChange={(e) => {
            setName(e.target.value);
            e.target.value ? setIsSearching(true) : setIsSearching(false);
          }}
          onKeyDown={handleKeyDown}
        />
      </div>

      {!isLoading ? (
        <div className="flex flex-wrap gap-5 items-center justify-center mt-12">
          {filteredProducts.length > 0 ? (
            !isSearching ? (
              filteredProducts
                .slice(
                  page * productsPerPage,
                  page * productsPerPage + productsPerPage
                )

                .map((product) => (
                  <Card
                    key={product._id}
                    name={
                      product.name.length > 14
                        ? product.name.slice(0, 10).concat("...").toUpperCase()
                        : product.name.toUpperCase()
                    }
                    price={product.retailPrice}
                    productId={product._id}
                    image={product.image}
                    work="Explore"
                    link="products"
                  />
                ))
            ) : (
              filteredProducts.map((product) => (
                <Card
                  key={product._id}
                  name={
                    product.name.length > 14
                      ? product.name.slice(0, 10).concat("...").toUpperCase()
                      : product.name.toUpperCase()
                  }
                  price={product.retailPrice}
                  productId={product._id}
                  image={product.image}
                  work="Explore"
                  link="products"
                />
              ))
            )
          ) : (
            <p>No Results Found</p>
          )}
        </div>
      ) : (
        <Load />
      )}
      {products.length > 0 && (
        <div className="flex items-center justify-around gap-10 sticky">
          {!isSearching && (
            <div>
              <button
                className={`px-2 py-1 md:p-2 font-semibold bg-white rounded-lg text-black md:font-bold ${
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

          {!isSearching && (
            <div>
              <button
                className={`px-2 py-1 md:p-2 rounded-lg bg-white text-black font-semibold md:font-bold `}
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
