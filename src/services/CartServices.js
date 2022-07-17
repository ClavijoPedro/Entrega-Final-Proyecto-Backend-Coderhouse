import { cartDao, productsDao } from "../persistence/daos/daoFactory.js"
import CartModel from "../models/CartModel.js";
import logger from "../utils/logger.js";

class CartServices{
    
    constructor(){
        this.cartDao = cartDao;
        this.productDao = productsDao;  
    };
    
    
    async saveProductInCart(cart_id, prod_id){
        try {
            const cart = await this.cartDao.getById(cart_id); 
            const product = await this.productDao.getById(prod_id);
            const isInCart = cart.productos.some(p => p.id == prod_id);
            if(!isInCart){
                cart.productos.push(product);
                await this.cartDao.updateById(cart_id, cart);
                return product
            }
            this.updateProdQuantity(cart_id, prod_id, 1);
            return product   
        } catch (error) { logger.error(error) }
    };
    

    async  updateProdQuantity(cart_id, prod_id, value){
        try {
            await this.cartDao.updateOne(cart_id, prod_id, value)
        } catch (error) { logger.error(error) }
    };


    async deleteProductFromCart(cart_id, prod_id){
        try {
            const cart = await this.cartDao.getById(cart_id);
            const product = cart.productos.find(p => p.id == prod_id);
            if(product.qty == 1){
                const products= cart.productos.filter(p => p.id != prod_id);  
                cart.productos = products;
                await cartDao.updateById(cart_id, cart);
            }
            this.updateProdQuantity(cart_id, prod_id, -1)
        } catch (error) { logger.error(error)}
    };


    async getAllCarts(){
        try{
            const carts = await this.cartDao.getAll()
            return carts;
        }
        catch(error){ logger.error(error) }
    };


    async getCartById(id){
        try{
            const cart = await this.cartDao.getById(id);
            return cart;
        }
        catch(error){ logger.error(error) }
    };


    async createCart(crt){
        try{
           CartServices.validateCart(crt, true)
           const createdCart = await this.cartDao.create(crt) 
           return createdCart
        }
        catch(error){ logger.error(error) }
    };


    async updateCartById(id, update){
        try{
            const updatedcart = await this.cartDao.updateById(id, update)
            return updatedcart
        }
        catch(error){ logger.error(error) }
    };


    async deleteCartById(id){
        try{
            const deletedCart = await this.cartDao.deleteById(id)
            return deletedCart 
        }
        catch(error){ logger.error(error) }
    };

    
    async deleteAllCarts(){
        try{
            const deleted = await this.cartDao.deleteAll()
            return deleted 
        }
        catch(error){ logger.error(error) }
    };

    static validateCart(cart, required){
        try{
            CartModel.validate(cart, required);
        }catch(error){
            throw new Error(`El carrito posee un formato json invalido o faltan datos ${error.details[0].message}`);
        }
    };


}


export default CartServices;