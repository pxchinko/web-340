/*
============================================
; Title: massie-exercise-5.2.js
; Author: Professor Krasso
; Date: September 6 2020
; Modified By: Sarah Massie
; Description: Making an EJS template
;===========================================
*/

var express = require("express");
var http = require("http");
var path = require("path");
var app = express();

app.set("views", path.resolve(__dirname,"views"));

app.set("view engine", "ejs");

var characters = [
    "Jojo", 
    "Oingo", 
    "Boingo", 
    "Hol Horse", 
    "D'Arby"
]

app.get("/", function(req, res) {
    res.render("index", {
        names: characters
    });
});

http.createServer(app).listen(8080, function() {
    console.log("Application started on port", 8080)
});