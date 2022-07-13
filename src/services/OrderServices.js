import { ordersDao } from "../daos/daoFactory.js";
import OrderModel from "../models/OrderModel.js";
import logger from "../utils/logger.js";
import { sendOrderMail } from "../utils/sendMail.js";


class OrderServices{
    constructor(){
        this.ordersDao = ordersDao;
    };

    async getAllOrders(filter){
        try{
            const orders = await this.ordersDao.getAll(filter)
            return orders;
        }
        catch(error){ logger.error(error) }
    };


    async getOrderById(id){
        try{
            const order = await this.ordersDao.getById(id);
            return order;
        }
        catch(error){ logger.error(error) }
    };


    async createOrder(user, products){
        try{
           const ordersList = await this.getAllOrders();
           const orderNumber = ordersList.length == 0 ? 1 : ordersList[ordersList.length - 1].orderNumber + 1; 
           const order = new OrderModel(user.email, orderNumber, products);
           OrderModel.validate(order); 
           const saveOrder = await this.ordersDao.create(order);
           if(saveOrder){
               await sendOrderMail(user.name, user.email, products );
               return saveOrder;
           }
        }
        catch(error){ logger.error(error) }
    };


    async updateOrderById(id, update){
        try{
            const updatedorder = await this.ordersDao.updateById(id, update)
            return updatedorder
        }
        catch(error){ logger.error(error) }
    };


    async deleteOrderById(id){
        try{
            const deletedorder = await this.ordersDao.deleteById(id)
            return deletedorder 
        }
        catch(error){ logger.error(error) }
    };

    
    async deleteAllOrders(){
        try{
            const deleted = await this.ordersDao.deleteAll()
            return deleted 
        }
        catch(error){ logger.error(error) }
    };
};

export default OrderServices;