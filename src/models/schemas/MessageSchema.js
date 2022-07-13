import mongoose from 'mongoose';
const { Schema } = mongoose

const MessageSchema = new Schema(
    {   
        email:{type:String, required:true},
        type:{type:String, required:true},
        body:{type:String, required:true},
        timestamp:{type:String, default: () => new Date().toLocaleString()}    
    },
); 

export default MessageSchema
