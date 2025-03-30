import Razorpay from 'razorpay';
const razorpay = new Razorpay({
  key_id: 'rzp_test_i44QxKNFFcOiCg',
  key_secret: '26cmThPPXcktidJIyzN1Oext'
});

// Controller method to create a payment order
export const createOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    console.log("hello")
    console.log(res.body)
    // Create an order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency: currency,
      payment_capture: 1 // Auto capture
    });

    // Send the order details back to the client
    res.json({ orderId: order.id, amount: order.amount });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Could not create order' });
  }
};

// Controller method to handle payment success webhook (optional)
export const paymentSuccess = (req, res) => {
  // Handle payment success here
  console.log('Payment success:', req.body);
  res.status(200).end();
};