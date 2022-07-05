import express from 'express';
import config from './config/config.js';
import logger from './utils/logger.js'; 
import { cpus } from 'os';
import cluster from 'cluster';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import path from 'path';



//ROUTER
import productosRouter from './routers/productos.js';
import carritoRouter from './routers/carrito.js';
import adminRouter from './routers/admin.js'
import userRouter from './routers/user.js'
import e404Router from './routers/404.js';



//INICIALIZO PASSPORT
import './auth/passport.js'

const app = express();


//middlewares JSON, URL y archivos estaticos  
app.use(express.static(path.join(process.cwd(),'/public')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//motor plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'public/views'));


//session
app.use(cookieParser());
app.use(session({
    secret: config.PRIVATE_KEY,
    saveUninitialized: false,
    rolling:true,
    resave: true,
    cookie: {
        maxAge: 600000
    }
}));


//Passport
app.use(passport.initialize());
app.use(passport.session());



//middlewares router 
app.use('/', userRouter);
app.use('/api/productos', productosRouter);
app.use('/api/productos', adminRouter);
app.use('/api/carrito',  carritoRouter);
app.use(e404Router);



//config Clusters && Server  
const numCPUs = cpus().length;

if(cluster.isPrimary && config.MODO === 'cluster' ){
    logger.info(`Primary running PORT ${config.PORT} - PID - ${process.pid}`)

    for(let i = 0; i < numCPUs; i++){
        cluster.fork()
    }

    cluster.on('exit', (worker, _code, _signal) => {
        logger.info(`worker ${worker.process.pid} died`)
        cluster.fork()
    })

}else{

    const server = app.listen(config.PORT, ()=>{
        logger.info(`Worker running PORT - ${config.PORT} - PID - ${process.pid}`)
    });
    server.on('error', (error) => logger.error(error));

};


