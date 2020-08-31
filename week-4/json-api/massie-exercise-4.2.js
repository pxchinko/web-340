/*
============================================
; Title:  massie-exercise-4.2.js
; Author: Professor Krasso
; Date:   30 August 2020
; Modified by: Sarah Massie
; Description: Creating JSON packages inside Express
;===========================================
*/
var express = require("express");
var http = require("http");
const { parse } = require("path");
var app = express();

app.get("/bestcat/:id", function (req,res) {
    var id = parseInt(request.params.id);
    res.json({
        firstName: "Monkey",
        lastName: "Cat",
        bestCat: id,
    })
});
http.createServer(app).listen(8080, function() {
    console.log("Application started on port ", 8080)
});