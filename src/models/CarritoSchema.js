import mongoose from 'mongoose';
import ProductoSchema from './ProductoSchema.js';
const { Schema } = mongoose


const CarritoSchema = new Schema(
    {
        productos:[ProductoSchema],
        code: {type: String, default: () => Date.now()}, 
    },
    {timestamps: true},
);

export default CarritoSchema;