import Joi from 'joi';

class CartModel{
    constructor(email, address, productos = []){
        this.email = email;
        this.adress = address;
        this.productos = productos;
    }

    static validate(cart, required){
        const CartSchema = Joi.object({
            email: required ? Joi.string().required() : Joi.string(),
            address: required ? Joi.string().required() : Joi.string(),
            productos: required ? Joi.array().required() : Joi.array().default([]),
        });

        const {error} = CartSchema.validate(cart);
        if(error){
            throw error
        };
    };
};

export default CartModel;