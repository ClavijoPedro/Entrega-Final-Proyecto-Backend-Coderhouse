const messageDTO = (message, id, timestamp) => {
    return{   
        ...message,
        id,
        timestamp       
    };
};

export default messageDTO;