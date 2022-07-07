import { Router } from 'express';
import ordersController from '../controllers/ordersController.js'

const ordersRouter = Router();

ordersRouter.get('/', ordersController.getOrders);

export default ordersRouter