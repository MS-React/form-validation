const Logger = require('js-logger');
Logger.useDefaults();
/* istanbul ignore next */
if(process.env.NODE_ENV === 'production') {
  Logger.setLevel(Logger.OFF);
}

// Log unhandled errors
window.onerror = logErrors;

export function logErrors(message, file, line = 'N/A', col = 'N/A') {
  Logger.error(`An Error Occurred!!: message[${message}], file[${file}], line[${line}], col[${col}]`);
  return false;
}
