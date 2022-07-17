export default function isAuth(req,res,next){
    if(!req.isAuthenticated()){
        return res.status(401).json({message:'Usuario no autenticado', user:null})
    }
    next()
};




