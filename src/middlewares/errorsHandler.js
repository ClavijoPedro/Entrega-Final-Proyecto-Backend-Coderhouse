
const errorHandler = (err, req, res, next) => {
    res.status(500);
    res.render('error.ejs', { error: err, title:'500' });
} 

const notMatchHandler = (req, res, next) => {
    res.status(404);
    res.render('404.ejs', {title:'404'})
}

export {errorHandler, notMatchHandler}