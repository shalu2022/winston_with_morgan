const winston = require("winston")

const rootDir = process.cwd()

// Get today's date
const today = new Date();

// Extract day, month, and year
const day = String(today.getDate()).padStart(2, '0'); // Get day and pad with leading zero if necessary
const month = String(today.getMonth() + 1).padStart(2, '0'); // Get month (Note: January is 0)
const year = today.getFullYear(); // Get full year

// Format the date as DD/MM/YYYY
const formattedDate = `${day}-${month}-${year}`;
let types = {
    file: {
        level: 'info',
        filename: `${rootDir}/logs/${formattedDate}.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};


// Configure Winston logger
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(types.console), // Log to console
        new winston.transports.File(types.file) // Log to file
    ],    
    exitOnError: false, // do not exit on handled exceptions

});
//for morgon
logger.stream={
    write: function(msg, encoding){
        logger.info(msg)
    }
}

module.exports = logger;