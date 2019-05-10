const fs = require("fs");
const definitions = JSON.parse(fs.readFileSync('definitions.json', 'utf8'));

module.exports = definitions;