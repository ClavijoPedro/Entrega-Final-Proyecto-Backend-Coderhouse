import mongoose from 'mongoose';
import ProductoSchema from './ProductSchema.js';
const { Schema } = mongoose


const CartSchema = new Schema(
    {
        email:{type:String, required:true},
        productos:[ProductoSchema],
        timestamp:{type:String, default: () => new Date().toLocaleString()},
        address:{type:String, required: true}//nuevo 
    },
);

export default CartSchema;