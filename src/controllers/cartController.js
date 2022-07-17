import logger from '../utils/logger.js';
import CartServices from '../services/CartServices.js';
import OrderServices from '../services/OrderServices.js';


const cartServices = new CartServices();
const orderServices = new OrderServices();

//Crea un carrito y devuelve su id
const createCart = async (req, res) => { 
    const {email, address} = await req.user;   
    try{
        const cartId = await cartServices.createCart({email, address, productos:[]});
        res.status(200).json({message:"carrito creado", id:cartId});                    
    }catch(err){ logger.error(err) };
};


//Envia orden de productos al admin
const orderCartProudcts = async (req,res) => {
    const { cart_id } = req.params;
    const user = await req.user;
    try{
        const cart = await cartServices.getCartById(cart_id);
        const saveOrder = await orderServices.createOrder(user, cart.productos)
        return res.json({message:'Orden enviada', orden:saveOrder})
    }catch(err){logger.error(err)}
};


//Vacía un carrito y lo elimina
const deleteCart = async (req, res) => {   
    const { cart_id } = req.params;
    try{
        await cartServices.deleteCartById(cart_id);
        res.status(200).json({message:'carrito eliminado', id:cart_id});
    }catch(err){ logger.error(err) };         
};



const getCartProducts = async (req, res) => {   
    const { cart_id } = req.params;
    try{
        const cart = await cartServices.getCartById(cart_id);
        res.status(200).json(cart.productos);
    }catch(err){ logger.error(err) }; 
};


const sendToCart = async (req, res) => {   
    const { cart_id, id } = req.params;         
    try{
        const productInCart = await cartServices.saveProductInCart(cart_id, id);
        res.status(201).json({message:'Producto agregado al carrito', product:productInCart}); 
    }catch(err){ logger.error(err) }; 
};


 //Elimina producto del carrito por id de carrito y  producto
const removeProductFromCart = async (req, res) => { 
    const {cart_id, id} = req.params
    try{
        await cartServices.deleteProductFromCart(cart_id, id)
        res.status(200).json({message:'Producto eliminado del carrito', id})    
    }catch(err){ logger.error(err) }  
};


export default{
    createCart,
    deleteCart,
    getCartProducts,
    orderCartProudcts,
    sendToCart,
    removeProductFromCart  
}