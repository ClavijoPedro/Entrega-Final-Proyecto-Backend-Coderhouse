class Dao{
    

    getAll(){
        throw new Error('falto implementar getAll()');
    };


    getById(id){
        throw new Error('falto implementar getById()');
    };

    getOne(itm){
        throw new Error('falto implementar getOne()');
    };


    create(itm){
        throw new Error('falto implementar save()');
    };


    updateById(id, itmUpdate){
        throw new Error('falto implementar updateById()');
    };


    deleteById(id){
        throw new Error('falto implementar deleteById()');
    };

    
    deleteAll(){
        throw new Error('falto implementar deleteAll()');
    };
};


export default Dao;