/*
============================================
; Title:  app.js
; Modified by: Sarah Massie
; Author: Professor Krasso
; Date:   31 August 2020
; Description: Demonstrates CRUD operations in a Node.js API.
;===========================================
*/

var express = require("express");
var http = require("http");
const { res } = require("express");

var app = express();

app.get("/", function(req, res) {
  res.send("you just sent a GET request, friend");
});
app.post("/", function(req, res) {
  res.send("a POST request? nice");
});
app.put("/", function(req, res) {
  res.send("i don’t see a lot of PUT requests anymore");
});
app.delete("/", function(req, res) {
  res.send("oh no, a DELETE??");
});
http.createServer(app).listen(3000, function() {
  console.log("App is listening on port", 3000);
});