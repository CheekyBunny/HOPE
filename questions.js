const fs = require("fs");
const questions = JSON.parse(fs.readFileSync('questions.json', 'utf8'));
module.exports = questions;