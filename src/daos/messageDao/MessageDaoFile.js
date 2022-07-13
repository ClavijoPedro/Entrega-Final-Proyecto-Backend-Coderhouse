import { promises as fs } from 'fs';
import messageDTO from '../../dtos/messageDto.js';
import logger from '../../utils/logger.js';
import Dao from '../Dao.js';


class MessageDaoFile extends Dao {
    
    constructor(file){
        super();
        this.file = `./db/${file}.json`;        
    };

    
    async getAll(){
        try{
            const messageList = await fs.readFile(this.file, 'utf-8')
            return JSON.parse(messageList)
        }catch(err){
            if(err.code === 'ENOENT'){
                await fs.writeFile(this.file, JSON.stringify([]))
            }else{
                logger.error(err)
            }
        }
    };


    async create(msg){
        try{
            const messageList = await this.getAll();
            const id = messageList.length == 0 ? 1 : messageList[messageList.length - 1].id + 1;
            const timestamp = new Date().toLocaleString();
            const newMessage = messageDTO(msg, id, timestamp);
            const newMessageList = [...messageList, newMessage]
            await fs.writeFile(this.file, JSON.stringify(newMessageList, null, 4));
            logger.info('Item  guardado:\n', newMessage)
            return id
        }catch(err){
            logger.error(`no se pudo guardar el mensaje error: ${err}`);
        }
    };


    async getByEmail(email){
        try{
            const messageList = await this.getAll();
            const messages = messageList.filter(msg => msg.email == email);
            return messages;
        }
        catch(error){ logger.error(error) }
    };

};

export default MessageDaoFile;