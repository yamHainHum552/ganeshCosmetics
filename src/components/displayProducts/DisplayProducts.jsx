"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";
import Card from "@/components/card/Card";
import GoToTop from "@/components/gototop/GoToTop";
import Load from "@/components/loading/Load";

const DisplayProduct = ({ buttonTitle, link }) => {
  const [name, setName] = useState("");
  const [page, setPage] = useState(0);
  const [productsPerPage] = useState(50);
  const [isSearching, setIsSearching] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [totalProducts, setTotalProducts] = useState([]);

  const totalPages = Math.ceil(totalProducts.length / productsPerPage);
  console.log(totalPages);

  useEffect(() => {
    async function getProducts() {
      setIsLoading(true);
      try {
        if (isSearching && name) {
          let fetchedProducts = [];
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
            fetchedProducts = [...fetchedProducts, ...pageProducts];
            moreProducts = pageProducts.length === productsPerPage;
            currentPage++;
          }
          setProducts(fetchedProducts);
          setHasMoreProducts(false);
        } else {
          const data = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER}/api/products?page=${page}&limit=${productsPerPage}`
          );
          if (!data.ok) {
            throw new Error("Error fetching products");
          }
          const products = await data.json();
          setProducts(products);
          setHasMoreProducts(products.length === productsPerPage);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getProducts();
  }, [page, productsPerPage, isSearching, name]);

  useEffect(() => {
    const getAllProduct = async () => {
      try {
        let response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER}/api/products/allProducts`
        );
        if (!response.ok) {
          throw new Error("Error fetching Products");
        }
        response = await response.json();
        setTotalProducts(response);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getAllProduct();
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
                work={buttonTitle}
                link={link}
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
        <div className="flex items-center justify-center gap-5 sticky">
          {!isSearching && (
            <>
              {/* Previous Button */}
              <button
                className={`px-2 py-1 md:p-2 font-semibold bg-white rounded-lg text-black md:font-bold ${
                  page < 1 ? "bg-gray-600" : ""
                }`}
                onClick={handlePrev}
                disabled={page < 1}
              >
                <FaArrowLeft />
              </button>

              {/* Render Page Numbers with Limited Range */}
              {Array.from({ length: totalPages }, (_, index) => {
                const rangeStart = Math.max(0, page - 2);
                const rangeEnd = Math.min(totalPages - 1, page + 2);

                if (index < rangeStart) {
                  if (index === rangeStart - 1)
                    return <span key={index}>...</span>;
                  return null;
                }
                if (index > rangeEnd) {
                  if (index === rangeEnd + 1)
                    return <span key={index}>...</span>;
                  return null;
                }

                return (
                  <button
                    key={index}
                    onClick={() => setPage(index)}
                    className={`px-3 py-1 rounded-lg font-semibold ${
                      page === index
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}

              {/* Next Button */}
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

export default DisplayProduct;
