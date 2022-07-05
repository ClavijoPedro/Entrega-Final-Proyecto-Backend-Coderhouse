import logger from '../utils/logger.js';
import sendMail from '../utils/sendMail.js';
import sendTxtMessage from '../utils/sendTxtMessage.js';
import config from '../config/config.js';
import { cartDao, productsDao } from '../daos/daoFactory.js';


const carrito = cartDao;
const productos = productsDao;

//VARIABLES ADMIN
const ADMIN__EMAIL=config.ADMIN_EMAIL;
const ADMIN__PHONE=config.ADMIN_PHONE;


//Crea un carrito y devuelve su id
const createCart = async (req, res) => {    
    try{
        const cartId = await carrito.save({productos:[]});
        const user = await req.user 
        user.cart_id = cartId //prueba
        res.status(200).send({id:cartId});                    
    }catch(err){ logger.error(err) };
};


//Envia orden de productos al admin
const orderCartProudcts = async (req,res) => {
    const { cart_id } = req.params;
    const {name, email, phone} = await req.user;

    try{
        const cart = await carrito.listById(cart_id);
        const cartProducts = cart.productos;
        if(cartProducts.length && req.user){
            
            //Envio email
            const mailAdminOptions = {
                from: 'Servidor Node.js',
                to: ADMIN__EMAIL,
                subject: `Nuevo pedido ${name} ${email}`, 
                html: `
                    <h3>Nuevo pedido:</h3>
                    <br>
                    <ul>
                        ${cartProducts.map(p => `<li>Producto: ${p.name} - Código:${p.code}</li>`)}
                    </ul>
                `
            };
            const sendOrderToAdminEmail = await sendMail(mailAdminOptions);
            
            //Envio mensaje whatsapp al Admin
            const wappAdminOptions = {
                body: `Nuevo pedido de ${name} (${email})`,
                from:config.TWILIO_WHTSP_TRIAL_NUMBER,
                to:`whatsapp:${ADMIN__PHONE}`
            }
            const sendOrderToAdminWapp = await sendTxtMessage(wappAdminOptions)
            
            
            //Envio mensaje whatsapp al cliente
            const wappClientOptions = {
                body: `${name} (${email}) tu pedido fue recibido y esta siendo procesado`,
                from:config.TWILIO_WHTSP_TRIAL_NUMBER,
                to:`whatsapp:${phone}`
            }
            const sendOrderToClientWapp = await sendTxtMessage(wappClientOptions)
            
            res.send('Orden enviada')
        }

    }catch(err){logger.error(err)}
}


//Vacía un carrito y lo elimina
const deleteCart = async (req, res) => {   
    const { cart_id } = req.params;
    try{
        await carrito.deleteById(cart_id);
        res.status(200).send('Carrito eliminado');
    }catch(err){ logger.error(err) };         
};


//lista productos guardados en el carrito 
const getCartProducts = async (req, res) => {   
    const { cart_id } = req.params;
    try{
        const cart = await carrito.listById(cart_id);
        res.status(200).send(cart.productos);
    }catch(err){ logger.error(err) }; 
};


//incorpora productos al carrito por su id
const sendToCart = async (req, res) => {   
    const { cart_id, id } = req.params;         
    try{
        const cart = await carrito.listById(cart_id); 
        const product = await productos.listById(id);
        const isInCart = cart.productos.some(p => p.id == id);
        if(!isInCart){
            cart.productos.push(product);
            await carrito.updateById(cart_id,cart);
            res.status(201).send('Producto agregado'); 
        }
    }catch(err){ logger.error(err) }; 
};


 //Elimina un producto del carrito por su id de carrito y de producto
const removeFromCart = async (req, res) => { 
    const {cart_id, id} = req.params
    try{
        const cart = await carrito.listById(cart_id);
        const products = cart.productos.filter(itm => itm.id != id);  
        cart.productos = products;
        await carrito.updateById(cart_id, cart);   
        res.status(200).send('Producto eliminado')    
    }catch(err){ logger.error(err) }  
};


export default{
    createCart,
    deleteCart,
    getCartProducts,
    orderCartProudcts,
    sendToCart,
    removeFromCart
    
}