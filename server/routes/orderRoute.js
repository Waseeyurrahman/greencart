import express from 'express';
import authUser from '../middleware/authUser.js';
import { getAllrOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from '../controllers/orderController.js';
import authSeller from '../middleware/authSeller.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD)
orderRouter.get('/user', authUser, getUserOrders)
orderRouter.get('/seller', authSeller, getAllrOrders)
orderRouter.post('/stripe', authUser, placeOrderStripe)

export default orderRouter;