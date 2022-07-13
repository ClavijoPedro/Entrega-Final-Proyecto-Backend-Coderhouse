import { usersDao } from "../daos/daoFactory.js";
import UserModel from "../models/UserModel.js";
import logger from "../utils/logger.js";
import { sendSignupMail } from "../utils/sendMail.js";
// import { sendSignupMail } from "../utils/sendMail.js";


class UserServices {
    constructor(){
        this.usersDao = usersDao;
    }

    async getAllUsers(){
        try{
            const users = await this.usersDao.getAll()
            return users;
        }
        catch(error){ logger.error(error) }
    };


    async getUserById(id){
        try{
            const user = await this.usersDao.getById(id);
            return user;
        }
        catch(error){ logger.error(error) }
    };


    async getUser(usr){
        try{
            const user = await this.usersDao.getOne(usr);
            return user;
        }
        catch(error){ logger.error(error) }
    };


    async createUser(usr){
        try{
           usr.timestamp = new Date().toLocaleString();
           UserModel.validate(usr, true); 
           const newUser = await this.usersDao.create(usr);
           if(newUser){
               await sendSignupMail(newUser)
               return newUser
           }
        }
        catch(error){ logger.error(error) }
    };


    async updateUserById(id, update){
        try{
            UserModel.validate(usr, false)
            const updatedUser = await this.usersDao.updateById(id, update)
            return updatedUser
        }
        catch(error){ logger.error(error) }
    };


    async deleteUserById(id){
        try{
            const deletedUser = await this.usersDao.deleteById(id)
            return deletedUser 
        }
        catch(error){ logger.error(error) }
    };

    
    async deleteAllUsers(){
        try{
            const deleted = await this.usersDao.deleteAll()
            return deleted 
        }
        catch(error){ logger.error(error) }
    };
};

export default UserServices;