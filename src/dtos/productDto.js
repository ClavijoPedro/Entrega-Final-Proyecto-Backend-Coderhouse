const productDTO = (product, id, timestamp, qty = 1) => {
    return{ 
        ...product,
        qty,
        id,
        timestamp 
    }
};

export default productDTO;