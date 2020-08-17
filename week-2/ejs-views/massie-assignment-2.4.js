/*
============================================
; Title:  massie-assignment-2.4.js
; Author: Professor Krasso
; Date:   16 August 2020
; Modified By: Sarah Massie
; Description: using express for a node server
;===========================================
*/
// header
var header = require('../../Massie-header.js');
  console.log(header.display("Sarah", "Massie", "Assignment 2.4"));

var http = require("http");
var express = require("express");
var path = require("path");
var app = express();

app.set("views", path.resolve(__dirname, "views"))
// tells express the views are in the "views" directory

app.set("view engine", "ejs");
// tell express to use the ejs view engine

app.get("/", function(request, person) {
    person.render("index", {
        firstName: "Sarah",
        lastName: "Massie",
        address: "Orange County"
    });
});

http.createServer(app).listen(3000, function() {
    console.log("EJS-Views app started on port 3000.")
});