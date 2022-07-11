import jwt from 'jsonwebtoken';
import config from '../config/config.js';

//cree el token en la ruta login y lo verifico en el middleware isValidToken

export function createAuthToken(data){
    const token = jwt.sign(data, config.PRIVATE_KEY);
    return token 
};

export function verifyAuthToken(data){
    const token = jwt.verify(data, config.PRIVATE_KEY);
    return token
};