import chalk from "chalk";



function printConsole(request, response, localDateStr, contentLength, duration) {
    console.log(`${chalk.whiteBright.bold(localDateStr)} -- ${chalk.bold.magenta(request.method)} - ${chalk.greenBright(request.path)} - ${chalk.bold.cyan(response.statusCode)} - ${contentLength} bytes - ${duration}ms`);
}

function logToFile(request, response, fileStream, localDateStr, contentLength, duration) {
    fileStream.write(`${localDateStr} -- ${request.method} - ${request.path} - ${response.statusCode} - ${contentLength} bytes - ${duration}ms\n`); 
}


export default function logApiRequests(request, response, next, consoleLogRequested=true, fileStream=null) {
    const start = Date.now();
    const date = new Date();
    const localDateStr = date.toLocaleString("en-GB", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    response.on("finish", () => {
        const duration = Date.now() - start;
        const contentLength = response.getHeader('Content-Length') || '0';

        if(consoleLogRequested) printConsole(request, response, localDateStr, contentLength, duration);
        if(fileStream !== null) logToFile(request, response, fileStream, localDateStr, contentLength, duration);
    });
    next();
}

export function log(obj) {
    console.log(chalk.red("debug:"), obj);
}