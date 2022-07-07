import mongoose from 'mongoose';
import config from '../../config/config.js';
import Dao from '../Dao.js';
import logger from '../../utils/logger.js';



class OrdersDaoMongoDB extends Dao {
    
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


    async getAll(filter){
        try{
            const orders = await this.model.find({filter})
            return orders;
        }
        catch(error){ logger.error(error) }
    }


    async getById(id){
        try{
            const order = await this.model.findById(id);
            return order;
        }
        catch(error){ logger.error(error) }
    }

    async create(prod){
        try{
           const order = new this.model(prod); 
           return await order.save()
        }
        catch(error){ logger.error(error) }
    }

    async updateById(id, update){
        try{
            const updatedorder = await this.model.findByIdAndUpdate(id, update)
            return updatedorder
        }
        catch(error){ logger.error(error) }
    }


    async deleteById(id){
        try{
            const deletedorder = await this.model.findByIdAndDelete(id)
            return deletedorder 
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


export default OrdersDaoMongoDB