import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { FaTrash } from "react-icons/fa"; // Trash Icon
import { useNavigate } from "react-router-dom";

function Cart() {
  const { currency, cartItems, fetchCart, addToCart, removeFromCart, deleteFromCart } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart(); // ✅ Fetch the latest cart data from the backend
  }, []);

  // Calculate prices
  const subtotal = cartItems.reduce((total, item) => total + (item.productId.price * item.quantity), 0);
  const discount = subtotal * 0.1; // 10% discount
  const shippingFee = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const totalPrice = subtotal - discount + shippingFee;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-5 text-center">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty 😞</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {cartItems.map((item) => (
            <div key={item.productId._id} className="flex flex-col sm:flex-row items-center sm:justify-between bg-gray-100 p-4 rounded-lg w-full">
              {/* Product Image */}
              <img
                src={item.productId.image[0]} // ✅ Fetch image from product
                alt={item.productId.name}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
              />

              {/* Product Details */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="font-semibold">{item.productId.name}</h2>
                <p className="text-gray-600">
                  {currency} {item.productId.price}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center mt-3 sm:mt-0">
                <button
                  onClick={() => removeFromCart(item.productId._id)}
                  className="px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded-l"
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() => addToCart(item.productId._id)}
                  className="px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded-r"
                >
                  +
                </button>
              </div>

              {/* Remove Item Button */}
              <button
                onClick={() => deleteFromCart(item.productId._id)}
                className="ml-4 text-red-500 hover:text-red-700 mt-3 sm:mt-0"
              >
                <FaTrash size={20} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Total Price & Checkout */}
      {cartItems.length > 0 && (
        <div className="mt-10 p-6 bg-white shadow-md rounded-lg w-full sm:w-96 mx-auto">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-3">Order Summary</h2>
          <div className="mt-4 text-gray-600 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium">{currency} {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount (10%):</span>
              <span>-{currency} {discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping Fee:</span>
              <span>{currency} {shippingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold mt-3">
              <span>Total:</span>
              <span>{currency} {totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={() => navigate("/place-order")}
            className="mt-5 w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
