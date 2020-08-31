var express = require("express");
var http = require("http");
const { parse } = require("path");
var app = express();

app.get("/bestcat/:id", function (req,res) {
    var id = parseInt(request.params.id);
    res.json({
        firstName: "Monkey",
        lastName: "Cat",
        bestCat: id,
    })
});
http.createServer(app).listen(8080, function() {
    console.log("Application started on port ", 8080)
});