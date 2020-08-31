/*
============================================
; Title:  massie-exercise-4.3.js
; Author: Professor Krasso
; Date:   30 August 2020
; Modified by: Sarah Massie
; Description: Creating messages and errors based on JSON
;===========================================
*/
var express = require("express");
var http = require("http");
var app = express();

app.get("/not-found", function(req,res) {
    res.status(404);
    res.json({
        error: "Resource not found."
    })
});
app.get("/ok", function(req, res) {
    res.status(200);
    res.json({
        message: "Page has loaded correctly."
    })
});
app.get("not-implemented", function(req, res) {
    res.status(501);
    res.json({
        error: "Page not implemented."
    })
});
http.createServer(app).listen(8080, function() {
    console.log("Application started on port", 8080)
});