import ProductoSchema from '../models/ProductoSchema.js';
import CarritoSchema from '../models/CarritoSchema.js';
import UserSchema from "../models/UserSchema.js";
import config from "../config/config.js";
import CartDaoFile from './CartDaoFile.js';
import ProductDaoFile from './ProductDaoFile.js';
import UserDaoFile from './UserDaoFile.js';
import ProductDaoMongoDB from './ProductDaoMongoDB.js';
import CartDaoMongoDB from './CartDaoMongoDB.js';
import UserDaoMongoDB from './UserDaoMongoDB.js';


let productsDao;
let cartDao;
let usersDao;

console.log('esto es switch', config.DB_CLIENT)
switch(config.DB_CLIENT){
    case 'filedb':
        productsDao = new ProductDaoFile('products')
        cartDao = new CartDaoFile('cart');
        usersDao = new UserDaoFile('users');
        break;
    default:
        productsDao = new ProductDaoMongoDB('producto',ProductoSchema);
        cartDao = new CartDaoMongoDB('carrito',CarritoSchema);
        usersDao = new UserDaoMongoDB('user',UserSchema);
}

export{
    productsDao,
    cartDao,
    usersDao
}
