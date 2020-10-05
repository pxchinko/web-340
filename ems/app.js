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
var http = require("http");
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var csrf = require("csurf");

var csrfProtection = csrf({cookie:true});

// app.set("port", process.env.PORT || 8080);

var Employee = require("./models/employees.js");

var app = express();
app.use(express.static('/public'))

// setup csrf protection

var csrfProtection = csrf({cookie: true});

// initialize express

var app = express();

// use statements

app.use(logger("short"));

app.use(helmet.xssFilter());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());
app.use(csrfProtection);

app.use(function(request, response, next) {
  var token = request.csrfToken();
  response.cookie('XSRF-TOKEN', token);
  response.locals.csrfToken = token;
  next();
});

var Employee = require("./models/employees.js");

// Database Connection
// mLab connection

var mongoDB = "mongodb+srv://secondUser:cwsM4JmuRNZEiN9M@buwebdev-cluster-1.eate3.mongodb.net/test";

mongoose.connect(mongoDB, {
    useMongoClient: true
});

mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));
db.once("open", function() {
    console.log("Application connected to mLab MongoDB instance");
});

//add employee model
var employees = new Employee({
    firstName: "",
    lastName: "",
    jobPosition: "",
    department: ""
});

//dependencies
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.set('port', process.env.PORT || 8080);
app.use(logger("short"));


//home route
app.get("/", function (request, response) {
    response.render("index", {
        title: "EMS | Massie",
        employees: employees
    });
});

app.get('/new', function(request, response) {
  response.render("new", {
    title: 'EMS | New',
    message: "New Employee:"
  });
});

app.get("/list",function(request,response){
  Employee.find({},function(error,employees){
    if(error) throw error;
    
    response.render("list",{
        title:"EMS | List of Employees",
        employees: employees
    });
  });
});

app.get("/view/:employeeId", function (request, response) {
  const employeeId = request.params["employeeId"];
  Employee.find({ _id: employeeId }, function (error, employee) {
    if (error) {
      console.log(error);
      throw error;
    } else {
      if (!!employee) {
        response.render("view", {
          title: "EMS | View",
          employee: employee,
        });
      } else {
        response.redirect("/");
      }
    }
  });
});

app.post("/process", function(request, response) {

  // console.log(request.body.txtName);
  if (!request.body.firstName||!request.body.lastName||!request.body.jobPosition||!request.body.department) {
      response.status(400).send("Entries must be filled out completely");
      return;
  }

  // get the request's form data

  var firstName = request.body.firstName;
  var lastName = request.body.lastName;
  var jobPosition = request.body.jobPosition;
  var department = request.body.department;

  console.log(firstName+', '+lastName+', '+jobPosition+', '+department);

  // create a employee model
  let employee = new Employee({
    firstName,
    lastName,
    jobPosition,
    department
  });

  // save
  employee.save(function (error) {
    if (error) throw error;
    console.log(firstName + " " + lastName + " saved successfully!");
  });

    response.redirect("/");
});


//create server
http.createServer(app).listen(app.get("port"), function() { 
  console.log('Application started on port ' + app.get("port")) 
});