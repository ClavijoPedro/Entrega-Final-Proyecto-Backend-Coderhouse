import { messagesDao } from "../persistence/daos/daoFactory.js";
import MessageModel from "../models/MessageModel.js";
import logger from "../utils/logger.js";


class MessageServices{
    constructor(){
        this.messageDao = messagesDao
    };


    async getAllMessages(){
        try{
            const messages = await this.messageDao.getAll()
            return messages;
        }
        catch(error){ logger.error(error) }
    };


    async createMessage(msg){
        try{
           MessageServices.validateMessage(msg, true) 
           const message = await this.messageDao.create(msg); 
           return message
        }
        catch(error){ logger.error(error) }
    };

    
    async getMessageByEmail(email){
        try{
            const messages = await this.messageDao.getByEmail(email);
            return messages;
        }
        catch(error){ logger.error(error) }
    };

    static validateMessage(message, required){
        try{
            MessageModel.validate(message, required);
        }catch(error){
            throw new Error(`la orden posee un formato json invalido o faltan datos ${error.details[0].message}`);
        }
    };
};


export default MessageServices