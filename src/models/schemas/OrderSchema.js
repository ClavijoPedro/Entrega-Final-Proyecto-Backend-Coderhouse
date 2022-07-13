import mongoose from 'mongoose';
const { Schema } = mongoose

const OrderSchema = new Schema(
    {   
        email:{type:String, required:true},
        items:{type:Array, required:true},
        orderNumber:{type:Number, required:true},
        status:{type:String, default:"generada"},
        timestamp:{type:Date, default: () => new Date().toLocaleString()}
    }
); 

export default OrderSchema