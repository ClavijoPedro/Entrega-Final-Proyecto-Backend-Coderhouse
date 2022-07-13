import mongoose from 'mongoose';
import config from '../../config/config.js';
import Dao from '../Dao.js';
import logger from '../../utils/logger.js';



class ProductDaoMongoDB extends Dao {
    
    constructor(model, schema){
        super();
        this.model = mongoose.model(model, schema);
        this.connectDB(config.MONGO_URI);  
    };

   
    async connectDB(connection){
        try{
            await mongoose.connect(connection, config.MONGO_OPTIONS)
        }catch(error){ logger.error(error)}
    };
 

    async disconnect(){    
        try{
            await mongoose.connection.close()
            .then(() => {
                logger.info('MongoDB disconnected', mongoose.connection.readyState)})
        }catch(err){ logger.error(err)}
    };


    async getAll(){
        try{
            const products = await this.model.find()
            return products;
        }
        catch(error){ logger.error(error) }
    };


    async getByCategory(category){
        try{
            const products = await this.model.find({category});
            return products;
        }
        catch(error){ logger.error(error) }
    };


    async getById(id){
        try{
            const product = await this.model.findById(id);
            return product;
        }
        catch(error){ logger.error(error) }
    };

    async getOne(prod){
        try{
            const product = await this.model.findOne(prod);
            return product;
        }
        catch(error){ logger.error(error) }
    };


    async create(prod){
        try{
           const product = new this.model(prod); 
           return await product.save()
        }
        catch(error){ logger.error(error) }
    };


    async updateById(id, update){
        try{
            const updatedProduct = await this.model.findByIdAndUpdate(id, update, {new:true})
            return updatedProduct
        }
        catch(error){ logger.error(error) }
    };


    async deleteById(id){
        try{
            const deletedProduct = await this.model.findByIdAndDelete(id)
            return deletedProduct 
        }
        catch(error){ logger.error(error) }
    };

    
    async deleteAll(){
        try{
            const deleted = await this.model.deleteMany({ })
            return deleted 
        }
        catch(error){ logger.error(error) }
    };
};


export default ProductDaoMongoDB