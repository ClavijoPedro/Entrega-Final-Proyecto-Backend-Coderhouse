const orderDTO = (order, id, timestamp) => {
    return{   
        ...order,
        id,
        timestamp
    };
};

export default orderDTO;