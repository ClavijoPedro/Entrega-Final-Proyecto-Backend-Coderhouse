import express from 'express';
import { createServer as HTTPServer } from 'http';
import { Server as IOServer } from 'socket.io';
import config from './config/config.js';
import logger from './utils/logger.js'; 
import cors from 'cors'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import handlebars from 'express-handlebars';
import passport from 'passport';
import path from 'path';

//ROUTER
import serverInfoRouter from './routers/serverInfoRouter.js';
import productsRouter from './routers/productsRouter.js';
import cartRouter from './routers/cartRouter.js';
import adminRouter from './routers/adminRouter.js'
import userRouter from './routers/userRouter.js'
import ordersRouter from './routers/ordersRouter.js';
import chatRouter from './routers/chatRouter.js';
import chatHandler from './controllers/chatController.js'

//ERRORS
import { errorHandler, notMatchHandler } from './middlewares/errorsHandler.js';

//PASSPORT
import './auth/passport.js'


const app = express();
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);
export {io};


//JSON, URL, EXPRESS.STATIC  
app.use(express.static(path.join(process.cwd(),'/public')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//TEMPLATES
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'chat.hbs',
    layoutsDir: path.join(process.cwd(), 'public/views')
}));
app.set('view engine', 'ejs');
app.set('view engine', 'pug');
app.set('views', path.join(process.cwd(), 'public/views'));


//SESSION
app.use(cookieParser());
app.use(session(config.EXPRESS_SESSION));


//PASSPORT
app.use(passport.initialize());
app.use(passport.session());


//ROUTER 
app.use('/', userRouter);
app.use('/api/productos', productsRouter);
app.use('/api/productos', adminRouter);
app.use('/api/carrito',  cartRouter);
app.use('/info', serverInfoRouter);
app.use('/orden', ordersRouter)
app.use('/chat', chatRouter)


//SOKETS
io.on('connection', chatHandler.chatSockets )


//ERRORS
app.use(notMatchHandler);
app.use(errorHandler)


//SERVER
const server = httpServer.listen(config.PORT, ()=>{
    logger.info(`SERVER RUNNING - PORT:${config.PORT}`)
});
server.on('error', (error) => logger.error(error));


