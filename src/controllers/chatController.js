import logger from "../utils/logger.js";
import { io } from "../server.js";
import MessageServices from "../services/MessageServices.js";


const messageServices =  new MessageServices;

const chatSockets = async (socket) => {
    console.log(`new connection`)
    const messages = await messageServices.getAllMessages()
    if(messages){
        try {
            socket.emit('messages', messages)

            socket.on('newMessage', async msg => {
                await messageServices.createMessage(msg)
                const newMessages = await messageServices.getAllMessages() 
                io.sockets.emit('messages', newMessages)
            });

            socket.on('userTyping', (userName) => {
                socket.broadcast.emit('userTyping', userName)
            
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