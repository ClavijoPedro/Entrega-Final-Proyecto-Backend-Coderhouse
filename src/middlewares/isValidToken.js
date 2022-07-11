import { verifyAuthToken } from '../auth/jwt.js';

export default function isValidToken (req, res, next){
    const token = req.header('auth_token');
    
    if(!token){
        return res.status(401).json({
            ok: false,
            message:'Se requiere token de autenticación'
        })
    };
    
    try {
        req.user = verifyAuthToken(token)
        next()
        
    } catch (error) {
        return res.status(403).json({
            ok:false,
            message:'nivel de acceso insuficiente para el recurso solicitado'
        })
    }
}; 