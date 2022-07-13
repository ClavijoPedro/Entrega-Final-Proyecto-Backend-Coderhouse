import Joi from 'joi';

class MessageModel{
    constructor(email, type, body, timestamp = new Date().toLocaleString()){
        this.email = email,
        this.type = type,
        this.body = body,
        this.timestamp = timestamp  
    }

    static validate(message, required){
        const messageSchema = Joi.object({
            email: required ? Joi.string().required() : Joi.string(),
            type: required ? Joi.string().required() : Joi.string(),
            body: required ? Joi.string().required() : Joi.string(),
            timestamp: required ? Joi.string().required() : Joi.string(),
        });

        const {error} = messageSchema.validate(message);
        if(error){
            throw error
        };
    };
};

export default MessageModel;