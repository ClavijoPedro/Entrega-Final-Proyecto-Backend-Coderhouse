import { Router } from 'express';
import productsController from '../controllers/productsController.js'
import isAuth from '../middlewares/isAuth.js'
import isValidToken from '../middlewares/isValidToken.js';


const productsRouter = Router();

//lista productos ó producto por su id
productsRouter.get('/:id?', isAuth, isValidToken, productsController.getProducts);

productsRouter.get('/categoria/:category', isAuth, isValidToken, productsController.getProductsByCategory);

export default productsRouter;

 