const validatePhoneNumber = (phoneNumber) => {
    const pattern = /^\d{10}$/
    if(!pattern.test(phoneNumber)){
        throw new Error('Número telefónico con formato inválido')
    }
    return phoneNumber;
};

export default validatePhoneNumber; 