import Joi from 'joi'

class OrderModel{
    constructor(email, orderNumber, items, status = "generada", timestamp = new Date().toLocaleString()){   
        this.email = email,
        this.items = items,
        this.orderNumber = orderNumber,
        this.status = status,
        this.timestamp = timestamp  
    };

    static validate(order, required){
        const OrderSchema = Joi.object({
            email: required ? Joi.string().required() : Joi.string(),
            items: required ? Joi.array().required() : Joi.array(),
            orderNumber: required ? Joi.number().required() : Joi.number(),
            status: required ? Joi.string().required() : Joi.string(),
            timestamp: required ? Joi.string().required() : Joi.string(), 
        });

        const {error} = OrderSchema.validate(order);
        if(error){
            throw error
        };
    };


};

export default OrderModel;