const header = require("../../Massie-header.js")
    console.log(header.display("Sarah", "Massie", "Assignment 6.4"))

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

app.get("/", function(request, response) {
  response.render("index");
 }); 

app.get('/new', function(request, response) {
  response.render('new', {
    title: 'EMS | New'
  });
});

app.get('/list', function(rewuest, response) {
  response.render('list', {
    title: "EMS | List"
  })
})

app.get('/view/:queryName', function(request, response) {
  const queryName = http.request.params['queryName'];
});

app.listen(3000, function() {
  console.log("Application started on port", 3000)
});