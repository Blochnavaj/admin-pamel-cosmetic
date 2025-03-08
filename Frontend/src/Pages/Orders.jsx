import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Tittle from '../Components/Tittle';
import { Truck, MapPin } from "lucide-react";
import axios from 'axios';
import { jwtDecode } from "jwt-decode"; // Import JWT decoder

function Orders() {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        console.warn("⚠ No token found");
        return;
      }

      // Decode token to get userId
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      console.log("🟢 Fetching Orders for userId:", userId);

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        { userId },  // Send userId in the request body
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      console.log("✅ Orders API Response:", response.data);

      if (response.data.success && response.data.orders.length > 0) {
        setOrderData(response.data.orders);
      } else {
        console.warn("⚠ No orders found.");
      }
    } catch (error) {
      console.error("❌ Error fetching orders:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className='mt-20 border-t pt-16 px-4 md:px-10 lg:px-20'>
      <div className='text-2xl mb-6'>
        <Tittle text1={'my'} text2={'orders'} />
      </div>

      <div className='space-y-6'>
        {orderData.length > 0 ? (
          orderData.map((order, index) => (
            <div key={index} className='p-4 border rounded-lg flex flex-col md:flex-row items-center gap-4 shadow-md'>
              {/* Check if order has items and get the first item */}
              {order.items && order.items.length > 0 ? (
                <>
                  <img 
                    src={order.items[0].image && order.items[0].image.length > 0 
                          ? order.items[0].image[0] 
                          : " https://www.shutterstock.com/image-illustration/thank-you-web-banner-template-600nw-2122701920.jpg"} 
                    alt={order.items[0].name} 
                    className='w-20 h-20 rounded-lg' 
                  />
                  <div className='flex-1'>
                    <h2 className='text-lg font-semibold'>{order.items[0].name}</h2>
                    <p className='text-gray-700'>Price: {currency}{order.items[0].price}</p>
                    <p className='text-gray-700'>Quantity: {order.items[0].quantity}</p>
                    <p className='text-sm text-green-600'>Status: {order.status}</p>
                    <p className='text-sm text-gray-500'>Payment method: {order.paymentMethod}</p>
                    <p>Date: <span className='text-gray-500'>{new Date(order.date).toDateString()}</span></p>
                  </div>
                </>
              ) : (
                <p className='text-gray-500'>No items found in this order</p>
              )}
              
              <div className='flex flex-col gap-2'>
                <button className='px-4 py-2 border rounded-md flex items-center gap-2 hover:bg-gray-100'>
                  <Truck size={16} /> Track Order
                </button>
                <button className='px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-700'>
                  <MapPin size={16} /> Shipping Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center text-gray-500'>No orders placed yet.</p>
        )}
      </div>
    </div>
  );
}

export default Orders;
