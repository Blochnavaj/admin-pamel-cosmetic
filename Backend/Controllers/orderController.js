import orderModel from "../Model/orderModel.js"
import userModel from "../Model/userModel.js";

//place order using  COD method 
const placeOrderCOD = async (req,res) => {
   try {
      const {userId, amount , address, items} = req.body

      const orderData ={
        userId,
        amount, items,
        address, 
        paymentMethod : "COD",
        payment : false,
        date : Date.now()
      }

      const newOrder = new orderModel(orderData);

      await newOrder.save();

      await userModel.findByIdAndUpdate(userId,{cartData : {}});

      res.json({ success : true , message: "Order status updated successfully", order: newOrder });

   } catch (error) {
    res.status(500).json({ success : false ,message: "Server error", error: error.message });

   }
}


//place order using Stripe method 
const placeOrderStripe = async (req,res) => {

}


//place order using  razorpay method 
const placeOrderRazorpay = async (req,res) => {
    
}

//place order using  Paypal method 
const placeOrderPaypal = async (req,res) => {

}

//all order data for admin panel 
const  allOrder = async (req,res) => {
    
}


// user order data for  frontend 
const  userOrder = async (req,res) => {
      try {
         const {userId} = req.body
         const orders = await orderModel.find({userId})

         res.json({
            success : true,
            orders
         })
      } catch (error) {
         res.status(500).json({ success : false ,message: "Server error", error: error.message });

      }
}

//update order status  from admin panel 
const  updateStatus = async (req,res) => {
    
}


export {placeOrderRazorpay, placeOrderStripe, updateStatus, userOrder, allOrder , placeOrderPaypal , placeOrderCOD}