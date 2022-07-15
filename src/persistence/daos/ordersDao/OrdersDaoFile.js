import { promises as fs } from 'fs';
import orderDTO from '../../dtos/orderDto.js';
import logger from '../../../utils/logger.js';
import Dao from '../Dao.js';


// let instance = null;

class OrdersDaoFile extends Dao {
    
    constructor(file){
        super();
        this.file = `./db/${file}.json`; 
    };


    async getAll(){
        try{
            const orderList = await fs.readFile(this.file, 'utf-8')
            return JSON.parse(orderList)
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
            const orderList = await this.getAll();
            const order = orderList.find( o => o.id === Number(id));
            return order
        }catch(err){ logger.error(err)}
    };


    async create(order){
        try{
            const orderList = await this.getAll();
            const id = orderList.length == 0 ? 1 : orderList[orderList.length - 1].id + 1;
            const timestamp = new Date().toLocaleString();
            const newOrder = orderDTO(order, id, timestamp);
            const newOrderList = [...orderList, newOrder]
            await fs.writeFile(this.file, JSON.stringify(newOrderList, null, 4));
            return newOrder
        }catch(err){
            logger.error(`no se pudo guardar la orden error: ${err}`);
        }
    };


    async updateById(id, update){
        try{
            const ordertList = await this.getAll();
            const index = ordertList.findIndex( o => o.id === Number(id));
            if(index < 0){
                throw new Error(`No se encuentra la orden`);
            }else{
                const order = ordertList[index];
                const timestamp = new Date().toLocaleString();
                const orderUpdate = orderDTO(update, Number(id), timestamp)
                const newOrder = Object.assign({},order, orderUpdate);
                ordertList[index] = newOrder;
                await fs.writeFile(this.file, JSON.stringify(ordertList, null, 4));
            }
        }catch(err){
            logger.error(`No se pudo actualizar la orden error: ${err}`);
        } 
    };


    async deleteById(id){
        try{
            const orderList = await this.getAll();
            const newOrderList = orderList.filter(p => p.id !== Number(id));
            await fs.writeFile(this.file, JSON.stringify(newOrderList, null, 4))
        }catch(err){
            logger.error(`no se pudo eliminar la orden, error: ${err}`);
        }
    };

    
    async deleteAll(){
        const orderList = [];
        try{
            await fs.writeFile(this.file, JSON.stringify(orderList, null, 4));
        }catch(err){
            logger.error(`las ordenes no se pudieron eliminar, error: ${err}`);
        }
    };
};

export default OrdersDaoFile;