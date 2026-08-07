
const fs = require('fs');

fs.writeFileSync("file.txt", "Hello, World!");

const data = fs.readFileSync("file.txt", "utf8");

console.log("file data:", data);