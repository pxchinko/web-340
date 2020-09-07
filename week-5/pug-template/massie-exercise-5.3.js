/*
============================================
; Title: massie-exercise-5.3.js
; Author: Professor Krasso
; Date: September 6 2020
; Modified By: Sarah Massie
; Description: Making a Pug template
;===========================================
*/
var express = require("express");
var path = require("path");
var http = require("http");
var pug = require("pug");
var app = express();

app.set("views", path.resolve(__dirname, "views"));

app.set("view engine", "pug");

app.get("/", function(request, response) {
    response.render("index", {
        message: "This is a Pug template page"
    });
});

http.createServer(app).listen(8080, function() {
    console.log("Server started on port", 8080)
})