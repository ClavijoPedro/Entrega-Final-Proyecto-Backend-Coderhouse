export default function isAuth(req,res,next){
    if(!req.isAuthenticated()){
        res.redirect('/login')
    }
    next()
};




