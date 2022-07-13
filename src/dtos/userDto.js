const userDTO = (user, id, timestamp) => {
    return{
        ...user,
        id,
        timestamp,
    }
};

export default userDTO;

