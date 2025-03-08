import React, { useRef } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function AllProductList() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handleProductClick = () => {
    navigate("/collection"); // Navigate to collection page
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top smoothly
  };

  const products = [
    { name: "Beauty", img: assets.Beauty },
    { name: "Books", img: assets.Books },
    { name: "Events", img: assets.Events },
    { name: "Fashion", img: assets.Fashion },
    { name: "Herbal", img: assets.Herbal_care },
    { name: "Jewelry", img: assets.Jewelry },
    { name: "Movie", img: assets.Movie },
    { name: "Music", img: assets.Music },
  ];

  return (
    <div className="relative mt-5 mx-auto max-w-screen-xl w-full">
      {/* Large Screens */}
      <div className="hidden lg:flex flex-wrap justify-center bg-gradient-to-r from-purple-200 to-pink-300 p-6 border rounded-2xl shadow-xl gap-6">
        {products.map((item, index) => (
          <div
            key={index}
            onClick={handleProductClick}
            className="border p-4 rounded-xl bg-white bg-opacity-60 backdrop-blur-lg cursor-pointer flex flex-col items-center transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:border-pink-500"
          >
            <img src={item.img} className="w-20" alt={item.name} />
            <p className="mt-2 font-bold text-lg text-gray-800">{item.name}</p>
          </div>
        ))}
      </div>

      {/* Medium Screens (Scrollable) */}
      <div
        ref={scrollRef}
        className="md:flex hidden lg:hidden items-center overflow-x-hidden scrollbar-hide bg-gradient-to-r from-purple-100 to-pink-200 p-4 border rounded-xl shadow-md"
      >
        {products.map((item, index) => (
          <div
            key={index}
            onClick={handleProductClick}
            className="border p-4 mx-2 rounded-xl bg-white bg-opacity-60 backdrop-blur-lg cursor-pointer flex flex-col items-center transition-all hover:scale-105 hover:shadow-xl"
          >
            <img src={item.img} className="w-16" alt={item.name} />
            <p className="mt-2 font-semibold text-gray-700">{item.name}</p>
          </div>
        ))}
      </div>

      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white p-3 rounded-full shadow-lg md:flex hidden lg:hidden hover:bg-pink-600"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white p-3 rounded-full shadow-lg md:flex hidden lg:hidden hover:bg-pink-600"
      >
        <FaArrowRight />
      </button>
    </div>
  );
}

export default AllProductList;
