import { ordersDao } from "../daos/daoFactory.js"
import logger from "../utils/logger.js";


const getOrders = async (req, res) => {
    const {email} = req.user;
    try {
        const orders = await ordersDao.getAll({email});
        if(orders){
            return res.json(orders)
        }
        res.json({message:'No hay ordenes cargadas'}); 
    } catch (error) {
        logger.error(error) 
    }
};

export default{
    getOrders
};