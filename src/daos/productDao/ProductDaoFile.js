import { promises as fs } from 'fs';
import logger from '../../utils/logger.js';
import Dao from '../Dao.js';


// let instance = null;

class ProductDaoFile extends Dao {
    
    constructor(file){
        super();
        this.file = `./db/${file}.json`; 
    };


    async getAll(){
        try{
            const productList = await fs.readFile(this.file, 'utf-8')
            return JSON.parse(productList)
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
            const productList = await this.getAll();
            const product = productList.find( p => p.id === Number(id));
            return product
        }catch(err){ logger.error(err)}
    };


    async getByCategory(category){
        try{
            const productList = await this.getAll();
            const products = productList.filter( p => p.category === category);
            return products
        }catch(err){ logger.error(err)}
    };


    async getOne(prod){
        try{
            const productList = await this.getAll();
            const product = productList.find(p => p.email == prod.email)
            return product
        }catch(err){logger.error(err)}
    };


    async create(prod){
        try{
            const productList = await this.getAll();
            const id = productList.length == 0 ? 1 : productList[productList.length - 1].id + 1;
            const code = Date.now();
            const timestamp = new Date().toLocaleString();
            const newProduct = {...prod, timestamp, id, code}
            const newProductList = [...productList, newProduct]
            await fs.writeFile(this.file, JSON.stringify(newProductList, null, 4));
            logger.info('Product  guardado:\n', newProduct)
            return id
        }catch(err){
            logger.error(`no se pudo guardar el item error: ${err}`);
        }
    };


    async updateById(id, prodUpdate){
        try{
            const productList = await this.getAll();
            const index = productList.findIndex( itm => itm.id === Number(id));
            if(index < 0){
                throw new Error(`No se encuentra el producto`);
            }else{
                const product = productList[index];
                const newProduct = Object.assign({},product, prodUpdate);
                productList[index] = newProduct;
                await fs.writeFile(this.file, JSON.stringify(productList, null, 4));
            }
        }catch(err){
            logger.error(`No se pudo actualizar el item erro: ${err}`);
        } 
    };


    async deleteById(id){
        try{
            const productList = await this.getAll();
            const newProductList = productList.filter(p => p.id !== Number(id));
            await fs.writeFile(this.file, JSON.stringify(newProductList, null, 4))
        }catch(err){
            logger.error(`no se pudo eliminar el item error: ${err}`);
        }
    };

    
    async deleteAll(){
        const productList = [];
        try{
            await fs.writeFile(this.file, JSON.stringify(productList, null, 4));
        }catch(err){
            logger.error(`no se pudo eliminar la lista de items error: ${err}`);
        }
    };
};

export default ProductDaoFile;