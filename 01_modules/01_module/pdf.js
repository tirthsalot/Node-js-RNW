

const fs = require('fs');

fs.writeFileSync("text.pdf","pdf file");

const data = fs.readFileSync("text.pdf","pdf");

console.log(data);