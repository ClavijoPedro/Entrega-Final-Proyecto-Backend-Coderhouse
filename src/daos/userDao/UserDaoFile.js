import { promises as fs } from 'fs';
import logger from '../../utils/logger.js';
import Dao from '../Dao.js';


class UserDaoFile extends Dao {
    
    constructor(file){
        super();
        this.file = `./db/${file}.json`;
        this.list = this.getAll();
        
    };


    async getAll(){
        try{
            const userList = await fs.readFile(this.file, 'utf-8')
            // logger.info('esto es item list',userList)
            return JSON.parse(userList)
        }catch(err){
            if(err.code === 'ENOENT'){
                await fs.writeFile(this.file, JSON.stringify([]))
            }else{
                logger.error(err)
            }
        }
    };


    async getById(id){
        try{
            const userList = await this.list;
            const user = userList.find( u => u.id === Number(id));
            logger.info('Item:\n',user)
            return user
        }catch(err){ logger.error(err)}
    };

    async getOne(usr){
        try{
            const userList = await this.getAll();
            const user = userList.find(u => u.email == usr.email)
            return user
        }catch(err){logger.error(err)}
    };


    async create(user){
        try{
            const userList = await this.getAll();
            const id = userList.length == 0 ? 1 : userList[userList.length - 1].id + 1;
            const timestamp = new Date().toLocaleString();
            const newUser = {...user, timestamp, id}
            const newUserList = [...userList, newUser]
            await fs.writeFile(this.file, JSON.stringify(newUserList, null, 4));
            logger.info('Item  guardado:\n', newUser)
            return id
        }catch(err){
            logger.error(`no se pudo guardar el item error: ${err}`);
        }
    };


    async updateById(id, userUpdate){
        try{
            const userList = await this.list;
            const index = userList.findIndex( u => u.id === Number(id));
            if(index < 0){
                throw new Error(`No se encuentra el producto`);
            }else{
                const user = userList[index];
                const newUser = Object.assign({},user, userUpdate);
                userList[index] = newUser;
                await fs.writeFile(this.file, JSON.stringify(userList, null, 4));
            }
        }catch(err){
            logger.error(`No se pudo actualizar el item erro: ${err}`);
        } 
    };


    async deleteById(id){
        try{
            const userList = await this.list;
            const newUserList = userList.filter(itm => itm.id !== Number(id));
            await fs.writeFile(this.file, JSON.stringify(newUserList, null, 4))
        }catch(err){
            logger.error(`no se pudo eliminar el item error: ${err}`);
        }
    };

    
    async deleteAll(){
        const userList = [];
        try{
            await fs.writeFile(this.file, JSON.stringify(userList, null, 4));
        }catch(err){
            logger.error(`no se pudo eliminar la lista de items error: ${err}`);
        }
    };
};

export default UserDaoFile;