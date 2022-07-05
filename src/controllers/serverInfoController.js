import {cpus} from 'os';
import config from '../config/config.js';
import logger from '../utils/logger.js';

const getServerInfo = (req, res) => {
    try {
        const serverInfo = {
            system: process.platform,
            cpus: cpus().length,
            memory:process.memoryUsage().rss,
            node:process.version,
            processId: process.pid,
            execPath: process.execPath,
            folder: process.cwd(),
        }
        if(Object.values(serverInfo).length){
            res.render('serverInfo.pug', {info: serverInfo})
        }
    } catch (error) {
        logger.error(error)
    }
}

export default {getServerInfo}