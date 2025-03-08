import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Tittle from '../Components/Tittle';

function PlaceOrder() {
  const [userInfo, setUserInfo] = useState({
    firstName: '', lastName: '', email: '', phone: '', street: '', city: '', state: '', zipCode: '', country: ''
  });
  const [method, setMethod] = useState('cod');

  const { backendUrl, token, cartItems, setCartItems, delivery_fees, products } = useContext(ShopContext);
  const navigate = useNavigate();

  const subtotal = 100.00;
  const discount = subtotal * 0.1;
  const shippingFee = 5.00;
  const total = subtotal - discount + shippingFee;

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
        if (!token) {
            toast.error("You must be logged in to place an order.");
            return;
        }

        // Decode token to extract user ID
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Extract payload
        const userId = decodedToken.id; // Ensure this is the correct field

        let orderItems = cartItems.map(item => {
            const productId = item.productId._id;
            const itemInfo = products.find(p => p._id === productId);
            return itemInfo ? { productId, name: itemInfo.name, price: itemInfo.price, quantity: item.quantity } : null;
        }).filter(item => item !== null);

        if (orderItems.length === 0) {
            toast.warn("Your cart is empty. Please add items before placing an order.");
            return;
        }

        let orderData = {
            userId, // ✅ Include user ID from token
            address: userInfo,
            items: orderItems,
            amount: total,
        };

        let response;
        if (method === 'cod') {
            response = await axios.post(
                `${backendUrl}/api/order/cod`,
                orderData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
        }

        if (response?.data?.success && response?.data?.order) {
            setCartItems([]); // ✅ Clear cart
            console.log(response.data.order)
            toast.success("Order placed successfully!");
            navigate('/orders');
        } else {
            toast.error(response?.data?.message || "Something went wrong. Try again.");
        }
    } catch (error) {
        console.error("Order placement failed:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Something went wrong, please try again.");
    }
};

  return (
    <form onSubmit={onSubmitHandler} className='container mx-auto px-4 py-10 mt-20'>
      <Tittle text1='Complete Your' text2='Order' />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
        <div className='bg-white p-8 rounded-lg shadow-lg border border-gray-200'>
          <h2 className='text-2xl font-bold mb-6 text-gray-800'>Billing Details</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {Object.keys(userInfo).map((key) => (
              <input required key={key} type='text' name={key} value={userInfo[key]} onChange={handleChange} placeholder={key.replace(/([A-Z])/g, ' $1').trim()} className='input-field' />
            ))}
          </div>
        </div>
        
        <div className='bg-white p-8 rounded-lg shadow-lg border border-gray-200'>
          <h2 className='text-2xl font-bold mb-6 text-gray-800'>Order Summary</h2>
          <div className='flex justify-between text-gray-700 mb-2'><span>Subtotal:</span><span className='font-medium'>${subtotal.toFixed(2)}</span></div>
          <div className='flex justify-between text-green-600 mb-2'><span>Discount (10%):</span><span className='font-medium'>-${discount.toFixed(2)}</span></div>
          <div className='flex justify-between text-gray-700 mb-2'><span>Shipping Fee:</span><span className='font-medium'>${shippingFee.toFixed(2)}</span></div>
          <div className='flex justify-between font-bold text-xl mt-4'><span>Total:</span><span className='text-gray-800'>${total.toFixed(2)}</span></div>
        </div>
      </div>

      <div className='mt-10 bg-white p-8 rounded-lg shadow-lg border border-gray-200'>
        <h2 className='text-2xl font-bold mb-6 text-gray-800'>Select Payment Method</h2>
        <div className='grid grid-cols-4 gap-6'>
          {[
            { name: 'PayPal', value: 'PayPal', img: 'https://www.paypalobjects.com/webstatic/mktg/logo-center/PP_Acceptance_Marks_for_LogoCenter_266x142.png' },
            { name: 'Stripe', value: 'Stripe', img: 'https://media.designrush.com/inspirations/656399/conversions/1-preview.jpg' },
            { name: 'Razorpay', value: 'Razorpay', img: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Razorpay_logo.webp' },
            { name: 'Cash On Delivery', value: 'cod', img: 'https://img.freepik.com/premium-vector/cod-icon-shipping-cash-delivery-symbol-vector-logo-template_883533-219.jpg?w=360' }
          ].map(payment => (
            <div key={payment.value} onClick={() => setMethod(payment.value)} className={`flex flex-col items-center border p-4 rounded-lg hover:shadow-lg transition transform hover:scale-105 cursor-pointer ${method === payment.value ? 'border-black' : 'border-gray-300'}`}>
              <img src={payment.img} alt={payment.name} className='w-16 h-16 object-contain' />
              <p className='mt-2 text-gray-700 font-medium'>{payment.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-10 text-center'>
        <button type='submit' className='px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold shadow-md'>
          Place Order
        </button>
      </div>

      <style>{`
        .input-field {
          width: 100%;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
          transition: border 0.3s;
        }
        .input-field:focus {
          border-color: black;
          outline: none;
        }
      `}</style>
    </form>
  );
}

export default PlaceOrder;