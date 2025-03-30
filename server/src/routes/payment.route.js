
import express from 'express' ;
const router = express.Router();
// const paymentController = require('../controllers/paymentController.js');
import {createOrder, paymentSuccess} from '../controllers/payment.controller.js';

// Route to create a payment order
router.post('/create-order',createOrder);
// Route to handle payment success webhook
router.post('/payment-success', paymentSuccess);

export default router;