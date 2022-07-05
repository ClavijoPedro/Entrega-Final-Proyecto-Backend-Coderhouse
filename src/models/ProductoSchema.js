import mongoose from 'mongoose';
const { Schema } = mongoose

const ProductoSchema = new Schema(
    {    
        name: {type: String, required: true} ,
        description: {type: String, required: true},
        price: {type: Number, required: true},
        stock: {type: Number, required: true},
        image: {type: String, required: true},
        qty: {type: Number, default:1},
        code: {type: String, default: () => Date.now()}, 
    },
    {timestamps: true}
); 

export default ProductoSchema