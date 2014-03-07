var train = require('express-train');

console.log("index.js:");
console.log("__dirname: ", __dirname);

module.exports = train(__dirname, {
    requests: {
        path: 'requests'
    }
});