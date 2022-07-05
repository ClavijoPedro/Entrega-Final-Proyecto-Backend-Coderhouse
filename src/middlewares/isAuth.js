
export default function isAuth(req,res,next){
    req.isAuthenticated() ? next() : res.render('login_error', {title: 'login_error'});
};




