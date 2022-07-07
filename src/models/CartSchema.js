import mongoose from 'mongoose';
import ProductoSchema from './ProductSchema.js';
const { Schema } = mongoose


const CartSchema = new Schema(
    {
        user_email:{type:String, required:true},
        productos:[ProductoSchema],
        timestamp:{type:Date, default: () => new Date().toLocaleString()} 
    },
);

export default CartSchema;