var http = require("http");
var express = require("express");
var path = require("path");
var app = express();

app.set("views", path.resolve(_dirname,"views"));
// tell express the views are in the 'views' directory

app.set("view engine", "ejs");
// tell express to use the ejs view engine

app.get("/", function(request, response) {
    response.render("index.ejs", {
        firstName: "Sarah",
        lastName: "Massie",
        address: "Orange County"
    });
});

http.createServer(app).listen(8080, function() {
    console.log("EJS-Views app started on port 8080.");
});