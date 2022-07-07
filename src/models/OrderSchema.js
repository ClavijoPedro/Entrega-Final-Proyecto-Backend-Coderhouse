import mongoose from 'mongoose';
const { Schema } = mongoose

const OrderSchema = new Schema(
    {   
        client_email:{type:String, required:true},
        items:{type:String, required:true},
        order_number:{type:Number, required:true},
        status:{type:String, default:"generada"},
        timestamp:{type:Date, default: () => new Date().toLocaleString()}
    }
); 

export default OrderSchema