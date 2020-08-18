/*
============================================
; Title:  massie-assignment-2.3.js
; Author: Professor Krasso
; Date:   16 August 2020
; Modified By: Sarah Massie
; Description: using express for a node server
;===========================================
*/
// header
const header = require('../../Massie-header.js');
console.log(header.display("Sarah", "Massie", "Assignment 2.3.js"));

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