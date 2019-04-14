const fs = require("fs");
const answers = JSON.parse(fs.readFileSync('questions.json', 'utf8'));
module.exports = questions;