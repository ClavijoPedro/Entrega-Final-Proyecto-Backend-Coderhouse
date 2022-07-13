import logger from '../utils/logger.js';
import { productsDao } from '../daos/daoFactory.js';
import ProductModel from '../models/productModel.js';


class ProductsServices{
    constructor(){
        this.productsDao = productsDao;
    }

    async getAllProducts(){
        try{
            const products = await this.productsDao.getAll()
            return products;
        }
        catch(error){ logger.error(error) }
    };


    async getProductByCategory(category){
        try{
            const products = await this.productsDao.getByCategory(category);
            return products;
        }
        catch(error){ logger.error(error) }
    };


    async getProductById(id){
        try{
            const product = await this.productsDao.getById(id);
            return product;
        }
        catch(error){ logger.error(error) }
    };

    async getProduct(prod){
        try{
            const product = await this.productsDao.getOne(prod);
            return product;
        }
        catch(error){ logger.error(error) }
    };


    async createProduct(prod){
        try{
           prod.code = Date.now(); 
           ProductsServices.validateProduct(prod, true) 
           const product = await this.productsDao.create(prod); 
           return product
        }
        catch(error){ logger.error(error) }
    };


    async updateProductById(id, update){
        try{
            ProductsServices.validateProduct(update, false) 
            const updatedProduct = await this.productsDao.updateById(id, update)
            return updatedProduct
        }
        catch(error){ logger.error(error) }
    };


    async deleteProductById(id){
        try{
            const deletedProduct = await this.productsDao.deleteById(id)
            return deletedProduct 
        }
        catch(error){ logger.error(error) }
    };

    
    async deleteAllProducts(){
        try{
            const deleted = await this.productsDao.deleteAll()
            return deleted 
        }
        catch(error){ logger.error(error) }
    };

    static validateProduct(product, required){
        try{
            ProductModel.validate(product, required);
        }catch(error){
            throw new Error(`el producto posee un formato json invalido o faltan datos ${error.details[0].message}`);
        }
    };
};

export default ProductsServices;


