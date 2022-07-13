import Joi from 'joi';

class MessageModel{
    constructor(email, type, body){
        this.email = email,
        this.type = type,
        this.body = body  
    }

    static validate(message, required){
        const messageSchema = Joi.object({
            email: required ? Joi.string().required() : Joi.string(),
            type: required ? Joi.string().required() : Joi.string(),
            body: required ? Joi.string().required() : Joi.string(),
        });

        const {error} = messageSchema.validate(message);
        if(error){
            throw error
        };
    };
};

export default MessageModel;