import bcrypt from 'bcrypt';

const hashPassword = (password) => {
    return bcrypt.hashSync(password,10)
}

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password )
}

export {
    hashPassword,
    isValidPassword
}