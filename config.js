const fs = require('fs');

const configPath = './config.json';
const parsed = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));

// We have to export each object in orden to access them separately
exports.crypto = parsed.crypto;
exports.expressSession = parsed.expressSession;
exports.port = parsed.port;
