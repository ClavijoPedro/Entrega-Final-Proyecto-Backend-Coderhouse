import { cartDao } from "../daos/daoFactory.js"
import CartModel from "../models/CartModel.js";
import logger from "../utils/logger.js";

class CartServices{
    
    constructor(){
        this.cartDao = cartDao;  
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

    async getCart(crt){
        try{
            const cart = await this.cartDao.getOne(crt);
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