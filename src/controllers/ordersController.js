import OrderServices from "../services/OrderServices.js";
import logger from "../utils/logger.js";

const orderServices = new OrderServices();

const getOrders = async (req, res) => {
    const {email} = req.user;
    try {
        const orders = await orderServices.getAllOrders({email});
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