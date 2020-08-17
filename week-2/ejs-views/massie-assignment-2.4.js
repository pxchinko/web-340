var http = require("http");
var express = require("express");
var path = require("path");
var app = express();

app.set("views", path.resolve(__dirname, "views"))
// tells express the views are in the "views" directory

app.set("view engine", "ejs");
// tell express to use the ejs view engine

app.get("/", function(request, person) {
    person.render("index", {
        firstName: "Sarah",
        lastName: "Massie",
        address: "Orange County"
    });
});

http.createServer(app).listen(3000, function() {
    console.log("EJS-Views app started on port 3000.")
});