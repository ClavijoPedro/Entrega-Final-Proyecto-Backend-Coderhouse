import { promises as fs } from 'fs';
import cartDTO from '../../dtos/cartDto.js';
import logger from '../../utils/logger.js';
import Dao from '../Dao.js';


class CartDaoFile extends Dao {
    
    constructor(file){
        super();
        this.file = `./db/${file}.json`;        
    };

    async getAll(){
        try{
            const cartList = await fs.readFile(this.file, 'utf-8')
            return JSON.parse(cartList)
        }catch(err){
            if(err.code === 'ENOENT'){
                await fs.writeFile(this.file, JSON.stringify([]))
            }else{
                logger.error(err)
            }
        }
    };


    async getById(id){
        try{
            const cartList = await this.getAll();
            const cart = cartList.find(c => c.id === Number(id));
            return cart
        }catch(err){ logger.error(err)}
    };

    
    async getOne(crt){
        try{
            const cartlist = await this.getAll();
            const cart = cartlist.find(c => c.id == crt.id)
            return cart
        }catch(err){logger.error(err)}
    };


    async create(crt){
        try{
            const cartList = await this.getAll();
            const id = cartList.length == 0 ? 1 : cartList[cartList.length - 1].id + 1;
            const timestamp = new Date().toLocaleString();
            const newCart = cartDTO(crt, id, timestamp);
            const newCartList = [...cartList, newCart];
            await fs.writeFile(this.file, JSON.stringify(newCartList, null, 4));
            logger.info('Item  guardado:\n', newCart)
            return id
        }catch(err){
            logger.error(`no se pudo guardar el carrito, error: ${err}`);
        }
    };


    async updateById(id, update){
        try{
            const cartList = await this.getAll();
            const index = cartList.findIndex( c => c.id === Number(id));
            if(index < 0){
                throw new Error(`No se encuentra el carrito`);
            }else{
                const cart = cartList[index];
                const timestamp = new Date().toLocaleString();
                const cartUpdate = cartDTO(update, Number(id), timestamp)
                const newCart = Object.assign({},cart, cartUpdate);
                cartList[index] = newCart;
                await fs.writeFile(this.file, JSON.stringify(cartList, null, 4));
            }
        }catch(err){
            logger.error(`No se pudo actualizar el carrito, error: ${err}`);
        } 
    };


    async deleteById(id){
        try{
            const cartList = await this.getAll();
            const newCartList = cartList.filter(c => c.id !== Number(id));
            await fs.writeFile(this.file, JSON.stringify(newCartList, null, 4))
        }catch(err){
            logger.error(`no se pudo eliminar el carrito, error: ${err}`);
        }
    };

    
    async deleteAll(){
        const cartList = [];
        try{
            await fs.writeFile(this.file, JSON.stringify(cartList, null, 4));
        }catch(err){
            logger.error(`no se pudo eliminar la lista de carritos, error: ${err}`);
        }
    };
};

export default CartDaoFile;