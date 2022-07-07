import { messagesDao } from "../daos/daoFactory.js";
import logger from "../utils/logger.js";
import { io } from "../server.js";

const msgs =  messagesDao;

const chatSockets = async (socket) => {
    const messages = await msgs.getAll()
    if(messages){
        try {
            socket.emit('messages', messages)
            socket.on('newMessage', async msj => {
                await msgs.create(msj)
                const newMessages = await msgs.getAll() 
                io.sockets.emit('messages', newMessages)
            })
        } catch (error) {
            logger.error(error)
        };
    };
};


const getChat = async(req, res) => {
    try {
        res.render('chat.hbs')
    } catch (error) {
        logger.error(error)
    };
};


const getChatMessagesByEmail = async(req, res) => {
    const {email} = req.params;
    try {
        const chatMessages = await msgs.getByEmail(email)
        res.json(chatMessages)
    } catch (error) {
        logger.error(error)
    };
};


export default {
    getChat,
    getChatMessagesByEmail,
    chatSockets
};