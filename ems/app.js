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

var csrfProtection = csrf({cookie: true});

var Employee = require("./models/employees.js");

var app = express();

app.use(helmet.xssFilter);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(csrfProtection);
app.use(function(req, res, next) {
  var token = req.csrfToken();
  res.cookie("XSRF-TOKEN", token);
  res.locals.csrfToken = token;
  next();
});

// database connection
var mongoDB = "mongodb+srv://secondUser:cwsM4JmuRNZEiN9M@buwebdev-cluster-1.eate3.mongodb.net/test";

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error: "));
db.once("open", function() {
  console.log("Application connected to mLab MongoDB instance");
});

// set up the views
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("short"));

// Home page
app.get('/', function(req, res) {
var employees = [
  {
    firstName: "Jotaro",
    lastName: "Kujo",
    jobPosition: "Marine Biologist",
    department: "Marine Biology"
  },
  {
    firstName: "Jonathon",
    lastName: "JoeStar",
    jobPosition: "Real Estate Agent",
    department: "Real Estate"
  },
  {
    firstName: "Hamlet",
    lastName: "The Cat",
    jobPosition: "Cat",
    department: "Gymnastics"
  },
  {
    firstName: "Calvin",
    lastName: "Tang",
    jobPosition: "Linguist",
    department: "Humanities"
  },
];
  res.render('index', {
    title: 'EMS | Home',
    employees: employees,
    message: "New Employee Entry Page"
  });
});

app.get('/new', function(req, res) {
  res.render('new', {
    title: 'EMS | New Employee'
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

app.get(`/view:queryName`, function(req, res) {
  const queryName = req.params['queryName'];

  Employee.find({'name': queryName}, function(error, employees) {
    if (error) {
      console.log(error);
      throw error;
    } else {
      console.log(employees)
      if (employees.length > 0) {
        res.render('view', {
          title: 'EMS | View',
          employees: employees
        })
      } else {
        res.redirect('/')
      }
    }
  })
});

app.post('/process', function(req, res) {
  console.log(req.body.txtName);
  if (!req.body.firstName||!req.body.lastName||!req.body.jobPosition||!req.body.department) {
    res.status(400).send('Entries must be filled out correctly.');
    return;
  };

  // get request's form data
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var jobPosition = req.body.jobPosition;
  var department = req.body.department;
  var employeeName = firstName + " " + lastName;
  console.log(employeeName + ', ' + jobPosition + ', ' + department);

  var employee = new Employee({
    firstName: firstName,
    lastName: lastName,
    jobPosition: jobPosition,
    department: department
  });

  // save employee name
  employee.save(function(error) {
    if (error) throw error;
    console.log(employeeName + ' saved successfully!');
    });
    res.redirect('/list');
});

http.createServer(app).listen(8080, function() {
  console.log("Application started on port", 3000);
});