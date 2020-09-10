var express = require("express");
var logger = require("morgan");
var http = require("http");
var path = require("path");
const { response } = require("express");

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("short"));

app.get("/", function(req, res) {
    response.render("index", {
    title: "Home page"
  });
});

http.createServer(app).listen(8080, function() {
  console.log("Application started on port", 8080)
});