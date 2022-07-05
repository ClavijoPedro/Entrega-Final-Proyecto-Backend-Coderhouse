import twilio from 'twilio'
import config from '../config/config.js'
import logger from './logger.js';


const accountSid = config.TWILIO_SID;
const authToken = config.TWILIO_TOKEN

const client = twilio(accountSid, authToken)

const sendTxtMessage = async (options) => {
    try {
       const message = await client.messages.create(options)
       logger.info('esto es message' + message)
    } catch (error) {
       logger.error(error)
    }
}

export default sendTxtMessage