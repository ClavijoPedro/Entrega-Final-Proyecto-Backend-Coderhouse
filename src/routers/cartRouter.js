import { Router } from 'express';
import cartController from '../controllers/cartController.js'
import isAuth from '../middlewares/isAuth.js'

const cartRouter = Router();


//Crea un carrito y devuelve su id
cartRouter.post('/', isAuth, cartController.createCart);

//Envia la orden de pedido
cartRouter.post('/:cart_id/orden', isAuth, cartController.orderCartProudcts);

//Vacía un carrito y lo elimina
cartRouter.delete('/:cart_id', isAuth, cartController.deleteCart);


//lista productos guardados en el carrito 
cartRouter.get('/:cart_id/productos', isAuth, cartController.getCartProducts);

//incorpora productos al carrito por su id
cartRouter.post('/:cart_id/productos/:id', isAuth, cartController.sendToCart);


 //Elimina un producto del carrito
cartRouter.delete('/:cart_id/productos/:id', isAuth, cartController.removeProductFromCart);
 

export default cartRouter