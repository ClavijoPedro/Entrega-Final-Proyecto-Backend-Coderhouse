import logger from "../utils/logger.js";
import { isValidPassword } from "../utils/encryptPassword.js";
import config from "../config/config.js";


export default async function isAdmin(req, res, next){
  const user = await req.user;
  
  if(!user){
    logger.warn('Ruta admin no autorizada')
    return res.status(401).json('Error 401 - Ruta no autorizada')
  }
  
  if(user.name !== 'admin' || !isValidPassword(user, config.ADMIN_PASS)){
    logger.warn('Ruta admin no autorizada')
    return res.status(401).json('Error 401 - Ruta no autorizada')
  }

  next()
};
