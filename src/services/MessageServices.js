import { messagesDao } from "../daos/daoFactory.js";
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
           msg.timestamp = new Date().toLocaleString();
           MessageModel.validate(msg) 
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


};


export default MessageServices