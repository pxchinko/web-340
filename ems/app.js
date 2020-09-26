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
var helmet = require("helmet");
var cookieParser = require("cookie-parser");
var csrf = require("csurf");
var http = require("http");
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var csrfProtection = csrf({cookie: true});

var Employee = require("./models/employees.js");

var app = express();

// database connection
var conn = "mongodb+srv://admin:MonkeyPassword@buwebdev-cluster-1.eate3.mongodb.net/test";

mongoose.connect(conn, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.log('Connection to the database instance successful')
}).catch(error => {
  console.log(`MongoDB Error: ${error.message}`)
});

mongoose.Promise = global.Promise;

app.use(logger("short"));
app.use(helmet.xssFilter);
app.use(bodyParser.urlencoded({
    extended: true
  })
);
app.use(cookieParser());
app.use(csrfProtection);
app.use(function(req, res, next) {
  var token = request.csrfToken();
  res.cookie("XSRF-TOKEN", token);
  res.locals.csrfToken = token;
  next();
});

// set up the views
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

// Home page
app.get('/', function(req, res) {
  res.render('index', {
    title: 'EMS | Home',
    employees: employees,
    message: "New Employee Entry Page"
  });
});

app.get("/list", function(req, res){
  Employee.find({}, function(error, employees){
    if (error) throw error;
    res.render("list",{
      title: "EMS | List",
      employees: employees
    });
    console.log(employees);
  });
});

app.get('/new', function(req, res) {
  res.render('new', {
    title: 'EMS | New Employee'
  });
});

app.post('/process', function(req, res) {
  console.log(req.body.txtName);
  if (!req.body.txtName) {
    res.status(400).send('Entries must have a name');
    return;
  };

// get request's form data
  var employeeName = req.body.txtName;
  console.log(employeeName);

// employee model
  var employee = new Employee({
    name: employeeName
  });

// save employee name
  employee.save(function(error) {
    if (error) {
      console.log(error);
      throw error;
    } else {
      console.log(employeeName + ' saved successfully!');
    };
    res.redirect('/list');
  });
});

http.createServer(app).listen(3000, function() {
  console.log("Application started on port", 3000);
});