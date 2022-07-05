import winston, { format } from 'winston';
import path from 'path';

const logger = winston.createLogger({

    format:format.combine(
        format.simple(),
        format.timestamp(),
        format.printf( log => `[${log.level}] [${log.timestamp}] - ${log.message}`)
    ),
    
    transports: [
        new winston.transports.File({
            filename: path.join(process.cwd(), './logs/error.log'),
            level: 'warn',
            maxFiles:10,
            maxsize:2000000
        }),

        new winston.transports.Console({
            level: 'info',
            format:winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
                winston.format.printf( log => `[${log.level}] [${log.timestamp}] - ${log.message}`)
            )
        })
    ],
});

export default logger