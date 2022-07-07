import { Router } from 'express';
import productsController from '../controllers/productsController.js'
import isAuth from '../middlewares/isAuth.js'


const productsRouter = Router();

//lista productos disponibles ó un producto por su id
productsRouter.get('/:id?', productsController.getProducts);

export default productsRouter;

 