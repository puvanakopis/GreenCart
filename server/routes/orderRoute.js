import express from 'express'
import authUser from '../middlewares/authUser';
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from '../controllers/orderController';
import authSeller from '../middlewares/authSeller';

const orderRouter=express.Router();

orderRouter.post('/cod',authUser,placeOrderCOD)
orderRouter.post('/user',authUser, getUserOrders)
orderRouter.post('/cod',authSeller,getAllOrders)
orderRouter.post('/stripe',authUser,placeOrderStripe)

export default orderRouter

