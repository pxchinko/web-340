/*
============================================
; Title: massie-exercise-6.3.js
; Author: Professor Krasso
; Date: September 11 2020
; Modified By: Sarah Massie
; Description: Connecting Node.js to MongoDB
;===========================================
*/
var express = require("express");
var mongoose = require("mongoose");
var http = require("http");
var logger = require("morgan");

var mongoDB = "mongodb+srv://admin:MonkeyPassword@buwebdev-cluster-1.eate3.mongodb.net/test";
mongoose.connect(mongoDB, {
    useMongoClient: true
});

mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function() {
    console.log("Application connected to mLab MongoDB instance")
})

var app = express();
app.use(logger('dev'));

http.createServer(app).listen(5000, function() {
    console.log('Application started on port', 5000)
})