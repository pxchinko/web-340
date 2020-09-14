/*
============================================
; Title:  app.js
; Author: Professor Krasso
; Modified By: Sarah Massie
; Date:   8 September 2020
; Description: Server file for the ems application
;===========================================
*/

var express = require("express");
var logger = require("morgan");
var http = require("http");
var path = require("path");

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("short"));
app.use(express.static(__dirname + 'css/style.css'));

app.get('/', function(req, res) {
  res.render('index', {
    title: 'EMS'
  });
});

app.get('/list', function(req, res) {
  res.render('list', {
    title: 'EMS | List'
  });
});

app.get('/new', function(req, res) {
  res.render('new', {
    title: 'EMS | New Employee'
  });
});

app.listen(3000, function() {
  console.log("Application started on port", 3000)
});