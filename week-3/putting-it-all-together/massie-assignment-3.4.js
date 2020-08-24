const header = require("../../Massie-header.js")
    console.log(header.display("Sarah", "Massie", "Assignment 3.4"))

/*
============================================
; Title:  massie-assignment-3.4.js
; Author: Professor Krasso
; Date:   24 August 2020
; Modified by: Sarah Massie
; Description: Base server configurations for
; a fully working Express application.
;===========================================
*/

//start of program
var express = require("express");
var http = require("http");
var logger = require("morgan");
var path = require("path");

var app = express();

app.set("views", path.resolve(__dirname, "views")); // tells express views are in the "views" directory
app.set("view engine", "ejs"); // tells express to use the ejs engine
app.use(logger("short"));

app.get('/', function(request, response) {
    response.render('index', {
      message: 'home page'
    })
  });
  
  app.get('/about', function(request, response) {
    response.render('about', {
      message:'about page'
    });
  });
  
  app.get('/contact', function(request, response) {
    response.render('contact', {
      message: 'contact page'
    });
  });
  
  app.get('/products', function(request, response) {
    response.render('products', {
      message: 'products page'
    });
  });
  
  http.createServer(app).listen(3000, function() {
    console.log('Application started on port, ', 3000)
  });
  // end of program