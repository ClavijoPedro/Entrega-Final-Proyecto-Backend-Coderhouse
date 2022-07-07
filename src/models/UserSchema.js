import mongoose from "mongoose";

const {Schema} = mongoose;

const UserSchema = new Schema({
    name:{type:String, required:true},
    password:{type:String, required: true},
    email:{type:String, required:true, unique:true},
    address:{type:String, required:true},
    phone:{type: String, required:true},
    avatar:{type: String},
});

export default UserSchema