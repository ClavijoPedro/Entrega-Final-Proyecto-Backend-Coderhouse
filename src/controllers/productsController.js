import logger from '../utils/logger.js';
import ProductsServices from '../services/ProductServices.js';

const prodServices = new ProductsServices();

const getProducts = async (req, res) => {   
    const { id } = req.params;
    try{
        if(id){
            const product = await prodServices.getProductById(id);
            if(!product){
                return res.status(400).json({error: 'Producto no encontrado'})
            };
            return res.status(200).json(product); 
        };
        const prodList = await prodServices.getAllProducts();           
        res.status(200).json(prodList); 
    }catch(err){ logger.error(err) };
};


const getProductsByCategory = async (req, res) => {
    const {category} = req.params;
    try {
        const products = await prodServices.getProductByCategory(category)
        res.status(200).json(products)
    } catch (error) {
        logger.error(error)
    }
};


//incorporar prodServices al listado
const saveProducts = async (req, res) => {   
    const productData = req.body;
    try{
        const product = await prodServices.createProduct(productData);     
        res.status(200).json({message:'Producto Creado', product}); 
    }catch(err){ logger.error(err) };
};


//Actualiza un producto por su id 
const UpdateProducts = async (req, res) => {   
    const { id } = req.params;
    const prod = req.body;     
    try{
        if(id && Object.keys(prod).length > 0){
            const update = await prodServices.updateProductById(id, prod);
            return res.status(201).json({message:'Producto Actualizado', product: update});
        };
    }catch(err){ logger.error(err) }           
};


//Borra un producto por su id 
const deleteProduct = async (req, res) => {  
    const { id } = req.params;            
    try{
        if(id){
            const deleted = await prodServices.deleteProductById(id);
            res.status(200).send({message:'Producto eliminado', product:deleted});
        };
    }catch(err){ logger.error(err) }
};



export default{
    getProducts,
    getProductsByCategory,
    saveProducts,
    UpdateProducts,
    deleteProduct,
}