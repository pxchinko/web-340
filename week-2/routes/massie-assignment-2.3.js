const { request } = require("express");

var express = require("express");
var http = require("http");

var app = express();

app.get("/", function(request, response) {
    response.end("Welcome to the homepage!"); // homepage response
});

app.get("/about", function(request, response) {
    response.end("Welcome to the about page!"); // about page response
});

app.get("/contact", function(request, response) {
    response.end("Welcome to the contact page!"); // contact page response
});

app.use( function(request, response) {
    response.statusCode = 404;
    response.end("404!"); // 404 page response
});

http.createServer(app).listen(8080);