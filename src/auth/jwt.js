import jwt from 'jsonwebtoken';
import config from '../config/config.js';


export function createAuthToken(data){
    const token = jwt.sign(data, config.PRIVATE_KEY,{expiresIn:config.SESSION_TIME});
    return token 
};

export function verifyAuthToken(data){
    const token = jwt.verify(data, config.PRIVATE_KEY);
    return token
};