import ProductSchema from '../models/ProductSchema.js';
import CartSchema from '../models/CartSchema.js';
import UserSchema from "../models/UserSchema.js";
import MessageSchema from '../models/MessageSchema.js';
import config from "../config/config.js";
import CartDaoFile from './cartDao/CartDaoFile.js';
import ProductDaoFile from './productDao/ProductDaoFile.js';
import UserDaoFile from './userDao/UserDaoFile.js';
import ProductDaoMongoDB from './productDao/ProductDaoMongoDB.js';
import CartDaoMongoDB from './cartDao/CartDaoMongoDB.js';
import UserDaoMongoDB from './userDao/UserDaoMongoDB.js';
import MessageDaoFile from './messageDao/MessageDaoFile.js';
import MessageDaoMongoDB from './messageDao/MessageDaoMongoDB.js';
import OrdersDaoFile from './ordersDao/OrdersDaoFile.js';
import OrdersDaoMongoDB from './ordersDao/OrdersDaoMongoDB.js';
import OrderSchema from '../models/OrderSchema.js';


let productsDao;
let cartDao;
let usersDao;
let messagesDao;
let ordersDao;

console.log('esto es switch', config.DB_CLIENT)
switch(config.DB_CLIENT){
    case 'filedb':
        productsDao = new ProductDaoFile('products')
        cartDao = new CartDaoFile('cart');
        usersDao = new UserDaoFile('users');
        messagesDao = new MessageDaoFile('messages')
        ordersDao = new OrdersDaoFile('order')
        break;
        default:
        productsDao = new ProductDaoMongoDB('producto',ProductSchema);
        cartDao = new CartDaoMongoDB('carrito',CartSchema);
        usersDao = new UserDaoMongoDB('user',UserSchema);
        messagesDao = new MessageDaoMongoDB('message', MessageSchema)
        ordersDao = new OrdersDaoMongoDB('order', OrderSchema)
}

export{
    productsDao,
    cartDao,
    usersDao,
    messagesDao,
    ordersDao
}
