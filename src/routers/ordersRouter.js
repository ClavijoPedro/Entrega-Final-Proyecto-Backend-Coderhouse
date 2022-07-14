import { Router } from 'express';
import ordersController from '../controllers/ordersController.js'
import isAuth from '../middlewares/isAuth.js';

const ordersRouter = Router();

ordersRouter.get('/', isAuth, ordersController.getOrders);

export default ordersRouter