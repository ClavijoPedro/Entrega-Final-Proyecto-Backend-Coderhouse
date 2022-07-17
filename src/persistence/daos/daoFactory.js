import ProductSchema from '../../models/schemas/ProductSchema.js';
import CartSchema from '../../models/schemas/CartSchema.js';
import UserSchema from "../../models/schemas/UserSchema.js";
import MessageSchema from '../../models/schemas/MessageSchema.js';
import OrderSchema from '../../models/schemas/OrderSchema.js';
import config from "../../config/config.js";
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
import logger from '../../utils/logger.js';


let productsDao;
let cartDao;
let usersDao;
let messagesDao;
let ordersDao;

logger.info('DB type', config.DB_TYPE)
switch(config.DB_TYPE){
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
