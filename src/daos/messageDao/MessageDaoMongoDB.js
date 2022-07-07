import mongoose from 'mongoose';
import config from '../../config/config.js';
import Dao from '../Dao.js';
import logger from '../../utils/logger.js';



class MessageDaoMongoDB extends Dao {
    
    constructor(model, schema){
        super();
        this.model = mongoose.model(model, schema);
        this.connectDB(config.MONGO_URI);  
    }

   
    async connectDB(connection){
        try{
            await mongoose.connect(connection)
        }catch(error){ logger.error(error)}
    }
 

    async disconnect(){    
        try{
            await mongoose.connection.close()
            .then(() => {
                logger.info('MongoDB disconnected', mongoose.connection.readyState)})
        }catch(err){ logger.error(err)}
    }


    async getAll(){
        try{
            const messages = await this.model.find()
            return messages;
        }
        catch(error){ logger.error(error) }
    }


    async create(msj){
        try{
           const message = new this.model(msj); 
           return await message.save()
        }
        catch(error){ logger.error(error) }
    }

    
    async getByEmail(email){
        try{
            const messages = await this.model.find({email});
            return messages;
        }
        catch(error){ logger.error(error) }
    }


}


export default MessageDaoMongoDB