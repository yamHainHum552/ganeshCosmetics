"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";
import Card from "@/components/card/Card";
import GoToTop from "@/components/gototop/GoToTop";
import Load from "@/components/loading/Load";

const Products = () => {
  const [name, setName] = useState("");
  const [page, setPage] = useState(0);
  const [productsPerPage] = useState(50);
  const [isSearching, setIsSearching] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  useEffect(() => {
    async function getProducts() {
      setIsLoading(true);
      try {
        const data = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER}/api/products?page=${page}&limit=${productsPerPage}`
        );
        if (!data.ok) {
          throw new Error("Error fetching products");
        }
        const products = await data.json();
        setProducts(products);

        // Disable 'Next' button if fetched products are less than productsPerPage
        setHasMoreProducts(products.length === productsPerPage);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getProducts();
  }, [page, productsPerPage]);

  const filteredProducts = useMemo(() => {
    if (!name) {
      return products;
    }
    return products.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );
  }, [name, products]);

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (hasMoreProducts) {
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
            filteredProducts.map((product) => (
              <Card
                key={product._id}
                name={product.name}
                price={product.retailPrice}
                productId={product._id}
                image={product.image}
                work="Explore"
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
        <div className="flex items-center justify-around gap-10 sticky">
          {!isSearching && (
            <>
              <button
                className={`px-2 py-1 md:p-2 font-semibold bg-white rounded-lg text-black md:font-bold ${
                  page < 1 ? "bg-gray-600" : ""
                }`}
                onClick={handlePrev}
                disabled={page < 1}
              >
                <FaArrowLeft />
              </button>

              <button
                className={`px-2 py-1 md:p-2 rounded-lg bg-white text-black font-semibold md:font-bold ${
                  !hasMoreProducts ? "bg-gray-600" : ""
                }`}
                onClick={handleNext}
                disabled={!hasMoreProducts}
              >
                <FaArrowRight />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
