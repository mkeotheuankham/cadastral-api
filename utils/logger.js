const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');

const logDirectory = path.join(__dirname, '../logs');

// ສ້າງໂຟນເດີ logs ຖ້າບໍ່ມີ
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// ສ້າງ rotating stream ສຳລັບ access log
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
});

// ສ້າງ rotating stream ສຳລັບ error log
const errorLogStream = rfs.createStream('error.log', {
  interval: '1d', // rotate daily
  path: logDirectory
});

// Morgan format ສຳລັບ access log
const accessLogFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';

// Custom logger
const logger = {
  // ສຳລັບ request logging
  access: morgan(accessLogFormat, { stream: accessLogStream }),

  // ສຳລັບ error logging
  error: (err, req) => {
    const message = `[${new Date().toISOString()}] ${req.method} ${req.url} - ${err.stack || err}\n`;
    errorLogStream.write(message);
  },

  // ສຳລັບ audit logging
  audit: (action, userId, details) => {
    const message = `[${new Date().toISOString()}] UserID: ${userId} - Action: ${action} - Details: ${JSON.stringify(details)}\n`;
    const auditStream = rfs.createStream('audit.log', {
      interval: '1d',
      path: logDirectory
    });
    auditStream.write(message);
  }
};

module.exports = logger;