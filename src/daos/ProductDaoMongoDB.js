import mongoose from 'mongoose';
import config from '../config/config.js';
import Dao from './Dao.js';
import logger from '../utils/logger.js';



class ProductDaoMongoDB extends Dao {
    
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


    async listAll(){
        try{
            const items = await this.model.find()
            return items;
        }
        catch(error){ logger.error(error) }
    }


    async listById(id){
        try{
            const item = await this.model.findById(id);
            return item;
        }
        catch(error){ logger.error(error) }
    }

    async listOne(itm){
        try{
            const item = await this.model.findOne(itm);
            return item;
        }
        catch(error){ logger.error(error) }
    }


    async save(itm){
        try{
           const item = new this.model(itm); 
           return await item.save()
        }
        catch(error){ logger.error(error) }
    }


    async updateById(id, update){
        try{
            const udatedItem = await this.model.findByIdAndUpdate(id, update)
            return udatedItem
        }
        catch(error){ logger.error(error) }
    }


    async deleteById(id){
        try{
            const deletedItem = await this.model.findByIdAndDelete(id)
            return deletedItem 
        }
        catch(error){ logger.error(error) }
    }

    
    async deleteAll(){
        try{
            const deleted = await this.model.deleteMany({ })
            return deleted 
        }
        catch(error){ logger.error(error) }
    }
}


export default ProductDaoMongoDB