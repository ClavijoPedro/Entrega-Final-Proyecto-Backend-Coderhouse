import { Router } from 'express';
import prodController from '../controllers/productsController.js'
import isAdmin from '../middlewares/isAdmin.js';


//instancia router
const adminRouter = Router();


//incorporar productos al listado
adminRouter.post('/', isAdmin, prodController.saveProducts);

//Actualiza un producto por su id 
adminRouter.put('/:id', isAdmin, prodController.UpdateProducts)

//Borra un producto por su id 
adminRouter.delete('/:id?', isAdmin, prodController.deleteProduct);


export default adminRouter