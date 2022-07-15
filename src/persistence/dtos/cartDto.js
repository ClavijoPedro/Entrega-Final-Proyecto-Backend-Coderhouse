const cartDTO = (cart, id, timestamp) => {
    return {
        ...cart,
        id,
        timestamp
    };
};

export default cartDTO;