const messageDTO = (message) => {
    return{   
        email: message.email,
        type:message.type,
        body:message.body,
        timestamp: message.timestamp        
    };
};

export default messageDTO;