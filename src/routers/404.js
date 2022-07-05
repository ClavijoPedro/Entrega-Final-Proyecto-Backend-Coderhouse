import { Router } from 'express';
import e404Control from '../controllers/404Controller.js'

//instancia router
const error404Router = Router();


//lista todos los productos disponibles ó un producto por su id
error404Router.all('*', e404Control.get404);

export default error404Router