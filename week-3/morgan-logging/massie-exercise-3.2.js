var express = require("express");
var http = require("http");
var path = require("path");
var logger = require("morgan");
var app = express();

app.set("views", path.resolve(__dirname, "views")); // tells express the views are in the "views" directory
app.set("view engine", "ejs"); // tells express to use the EJS engine
app.use(logger("short"));

app.get("/", function(request, response) {
    response.render("index", {
        message: "This is my first Morgan Logger site!"
    });
});

http.createServer(app).listen(8080, function() {
    console.log("Application started on port 8080");
});