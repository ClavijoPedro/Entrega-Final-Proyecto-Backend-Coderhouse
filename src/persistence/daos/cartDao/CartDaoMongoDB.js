import mongoose from 'mongoose';
import config from '../../../config/config.js';
import Dao from '../Dao.js';
import logger from '../../../utils/logger.js';


class CartDaoMongoDB extends Dao {
    
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
            const carts = await this.model.find()
            return carts;
        }
        catch(error){ logger.error(error) }
    };


    async getById(id){
        try{
            const cart = await this.model.findById(id);
            return cart;
        }
        catch(error){ logger.error(error) }
    };


    async create(crt){
        try{
           const cart = new this.model(crt);
           const createdCart = await cart.save()
           return createdCart.id
        }
        catch(error){ logger.error(error) }
    };


    async updateById(id, update){
        try{
            const updatedcart = await this.model.findByIdAndUpdate(id, update, {new:true})
            return updatedcart
        }
        catch(error){ logger.error(error) }
    };

  
  
    async updateOne(cart_id, prod_id, value){
        try {
            const updatedProdInCart = await this.model.findOneAndUpdate(
                {_id:cart_id, 'productos._id':prod_id},
                {$inc:{'productos.$.qty': value}},
            );
            return updatedProdInCart
            
        } catch (error) { logger.error(error) }
    };
    

    async deleteById(id){
        try{
            const deletedCart = await this.model.findByIdAndDelete(id)
            return deletedCart 
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
}


export default CartDaoMongoDB