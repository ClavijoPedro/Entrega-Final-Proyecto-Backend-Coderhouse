import Joi from 'joi';

class ProductModel{
    constructor(name, description, price, category, image, stock = 0, qty = 1, code = Date.now() ){
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.image = image;
        this.code = code 
        this.qty = qty;
        this.category = category;
    }

    static validate(product, required){
        const ProductSchema = Joi.object({
            name: required ? Joi.string().required() : Joi.string(),
            description: required ? Joi.string().required() : Joi.string(),
            price: required ? Joi.number().required() : Joi.number(),
            stock: required ? Joi.number().default(0) : Joi.number(),
            image: required ? Joi.string().required() : Joi.string(),
            code: required ? Joi.number().required() : Joi.number(),
            qty: required ? Joi.number().default(1) : Joi.number(),
            category: required ? Joi.string().required() : Joi.string(),
        });

        const {error} = ProductSchema.validate(product);
        if(error){
            throw error
        };
    };
};

export default ProductModel;