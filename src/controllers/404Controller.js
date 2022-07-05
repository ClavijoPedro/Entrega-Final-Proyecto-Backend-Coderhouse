const get404 = (req, res) => {
    res.render('404',{title:'404'})
}

export default {
    get404
}