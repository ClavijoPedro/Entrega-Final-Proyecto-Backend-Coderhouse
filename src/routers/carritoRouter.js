import { Router } from 'express';
import cartController from '../controllers/carritoController.js'
import isAuth from '../middlewares/isAuth.js'



//instancia router 
const carritoRouter = Router();


//Crea un carrito y devuelve su id
carritoRouter.post('/', isAuth, cartController.createCart);

//Envia la orden de pedido
carritoRouter.post('/:cart_id/order', isAuth, cartController.orderCartProudcts);

//Vacía un carrito y lo elimina
carritoRouter.delete('/:cart_id', isAuth, cartController.deleteCart);


//lista productos guardados en el carrito 
carritoRouter.get('/:cart_id/productos', isAuth, cartController.getCartProducts);

//incorpora productos al carrito por su id
carritoRouter.post('/:cart_id/productos/:id', isAuth, cartController.sendToCart);


 //Elimina un producto del carrito por su id de carrito y de producto
carritoRouter.delete('/:cart_id/productos/:id', isAuth, cartController.removeFromCart);
 

export default carritoRouter