import mongoose from 'mongoose';
import config from '../../config/config.js';
import Dao from '../Dao.js';
import logger from '../../utils/logger.js';



class UserDaoMongoDB extends Dao {
    
    constructor(model, schema){
        super();
        this.model = mongoose.model(model, schema);
        this.connectDB(config.MONGO_URI);  
    };

   
    async connectDB(connection){
        try{
            await mongoose.connect(connection)
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
            const users = await this.model.find()
            return users;
        }
        catch(error){ logger.error(error) }
    };


    async getById(id){
        try{
            const user = await this.model.findById(id);
            return user;
        }
        catch(error){ logger.error(error) }
    };


    async getOne(usr){
        try{
            const user = await this.model.findOne(usr);
            return user;
        }
        catch(error){ logger.error(error) }
    };


    async create(usr){
        try{
           const user = new this.model(usr); 
           return await user.save()
        }
        catch(error){ logger.error(error) }
    };


    async updateById(id, update){
        try{
            const updatedUser = await this.model.findByIdAndUpdate(id, update)
            return updatedUser
        }
        catch(error){ logger.error(error) }
    };


    async deleteById(id){
        try{
            const deletedUser = await this.model.findByIdAndDelete(id)
            return deletedUser 
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


export default UserDaoMongoDB