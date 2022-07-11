// import jwt from 'jsonwebtoken';
// export default function isAuth(req,res,next){
//     req.isAuthenticated() ? next() : res.render('login_error.ejs', {title: 'login_error'});
// };


export default function isAuth(req,res,next){
    var token = req.headers['auth_token']

    if(req.isAuthenticated()){
        next()
    }
    ('login_error', {title: 'login_error'});
};




