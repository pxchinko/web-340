/*
============================================
; Title:  app.js
; Author: Professor Krasso
; Modified By: Sarah Massie
; Date:   8 September 2020
; Description: Server file for the ems application
;===========================================
*/

const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const http = require("http");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const csrfProtection = csrf({cookie: true});


const Employee = require("./models/employees");
const { response } = require("express");

let app = express();

// database connection
const conn = "mongodb+srv://admin:MonkeyPassword@buwebdev-cluster-1.eate3.mongodb.net/test";

mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
}).then(() => {
  console.log('Connection to the database instance successful')
}).catch(error => {
  console.log(`MongoDB Error: ${error.message}`)
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));
db.once("open", function() {
  console.log("Application connected to mLab MongoDB instance");
});

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

app.get("/list", function(req,res){
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

//  redirect to home page
app.get('/view/:queryName', function(req, res) {
  const queryName = req.params.queryName;

  Employee.find({'name': queryName}, function(error, employees) {
    if (error) {
      throw error;
    } else {
      console.log(employees);

      if (employees.length > 0) {
        res.render('view', {
          title: 'EMS | View',
          employee: employees
        })
      } else {
        res.redirect('/list');
      }
    }
  })
});

http.createServer(app).listen(3000, function() {
  console.log("Application started on port", 3000);
});