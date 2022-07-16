import Joi from 'joi';

class UserModel{
    constructor(user){
        this.name = user.name;
        this.password = user.password;
        this.email = user.email
        this.address = user.address;
        this.phone = user.phone;
        this.avatar = user.avatar; 
    }

    static validate(user, required){
        const UserSchema = Joi.object({
            name: required ? Joi.string().required() : Joi.string(),
            password: required ? Joi.string().required() : Joi.string(),
            email: required ? Joi.string().required() : Joi.string(),
            address: required ? Joi.string().required() : Joi.string(),
            phone: required ? Joi.string().required() : Joi.string(),
            avatar: Joi.string().allow(''),
        });

        const {error} = UserSchema.validate(user);
        if(error){
            throw error
        };
    };
};

export default UserModel;