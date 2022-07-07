import mongoose from 'mongoose';
const { Schema } = mongoose

const MessageSchema = new Schema(
    {   
        email:{type:String, required:true},
        type:{type:String, required:true},
        body:{type:String, required:true},
        timestamp:{type:Date, default: () => new Date().toLocaleString()}    
    },
); 
// const MessageSchema = new Schema(
//     {   
//         author: {
//             email:{type: String, required: true} ,
//             name:{type: String, required: true} ,
//             lastname:{type: String, required: true} ,
//             age:{type: Number, required: true},
//             alias:{type: String, required: true} ,
//             avatar: {type: String, required: true},
//         },
//         text: {type: String, required: true},  
//     },
//     {timestamps: true}
// ); 

export default MessageSchema
