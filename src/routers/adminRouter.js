import { Router } from 'express';
import prodController from '../controllers/productsController.js'
import isAdmin from '../middlewares/isAdmin.js';
import isAuth from '../middlewares/isAuth.js';


//instancia router
const adminRouter = Router();


//incorporar productos al listado
adminRouter.post('/', isAuth, isAdmin, prodController.saveProducts);

//Actualiza un producto por su id 
adminRouter.put('/:id', isAuth, isAdmin, prodController.UpdateProducts)

//Borra un producto por su id 
adminRouter.delete('/:id?', isAuth, isAdmin, prodController.deleteProduct);


export default adminRouter