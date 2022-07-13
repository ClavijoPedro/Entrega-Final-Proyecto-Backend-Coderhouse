import mongoose from 'mongoose';
const { Schema } = mongoose

const ProductSchema = new Schema(
    {    
        name: {type: String, required: true} ,
        description: {type: String, required: true},
        price: {type: Number, required: true},
        stock: {type: Number, required: true},
        image: {type: String, required: true},
        code: {type: Number, required: true},
        qty: {type: Number, default:1},
        category:{type: String, required: true}, 
        timestamp:{type:String, default: () => new Date().toLocaleString()}
    },
); 

export default ProductSchema