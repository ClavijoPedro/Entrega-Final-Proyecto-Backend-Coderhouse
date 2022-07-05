import { Router } from 'express';
import cartContrl from '../controllers/carritoController.js'
import isAuth from '../middlewares/isAuth.js'



//instancia router 
const carritoRouter = Router();


//Crea un carrito y devuelve su id
carritoRouter.post('/', isAuth, cartContrl.createCart);

//Envia la orden de pedido
carritoRouter.post('/:cart_id/order', isAuth, cartContrl.orderCartProudcts);

//Vacía un carrito y lo elimina
carritoRouter.delete('/:cart_id', isAuth, cartContrl.deleteCart);


//lista productos guardados en el carrito 
carritoRouter.get('/:cart_id/productos', isAuth, cartContrl.getCartProducts);

//incorpora productos al carrito por su id
carritoRouter.post('/:cart_id/productos/:id', isAuth, cartContrl.sendToCart);


 //Elimina un producto del carrito por su id de carrito y de producto
carritoRouter.delete('/:cart_id/productos/:id', isAuth, cartContrl.removeFromCart);
 

export default carritoRouter