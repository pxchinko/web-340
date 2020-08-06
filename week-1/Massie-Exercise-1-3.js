const header = require('../Massie-header.js');
 console.log(header.display("Sarah", "Massie", "Exercise 1.3"));

var url = require("url");
var parsedURL = url.parse("https://www.pxchinko.com/profile?name=massie");

console.log("\n" + parsedURL.protocol);
console.log(parsedURL.host);
console.log(parsedURL.query);