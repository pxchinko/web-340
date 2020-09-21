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
const http = require("http");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const Employee = require("./models/employees");
const bodyParser = require("body-parser");

// database connection
const conn = "mongodb+srv://admin:MonkeyPassword@buwebdev-cluster-1.eate3.mongodb.net/test";

mongoose.connect(conn, {
  useMongoClient: true,
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
}).then(() => {
  console.log('Connection to the database instance successful')
}).catch(err => {
  console.log('MongoDB Error: ${err.message}')
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));
db.once("open", function() {
  console.log("Application connected to mLab MongoDB instance");
});

app.use(logger("short"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
  Employee.find({}, function(err, employees) {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log(employees);
      res.render('index', {
        title: 'EMS'
      });
    }
  });
});

app.get('/list', function(req, res) {
  res.render('list', {
    title: 'EMS | List'
  });
});

app.get('/new', function(req, res) {
  res.render('new', {
    title: 'EMS | New Employee'
  });
});

app.post('/process', function(req, res) {
  if (!req.body.txtName) {
    res.status(400).send('Entries must have a name');
    return;
  }

// get request's form data
  const employeeName = req.body.txtName;
  console.log(employeeName);

// employee model
  let employee = new Employee({
    name: employeeName
  });

  employee.save(function(err) {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log(employeeName + ' saved successfully!');
      res.redirect('/');
    }
  });
});

//  redirect to home page
app.get('/view/:queryName', function(req, res) {
  const queryName = req.params['queryName'];

  Fruit.find({'name': queryName}, function(err, employees) {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log(employees);

      if (employees.length > 0) {
        res.render('view', {
          title: 'EMS | View',
          employee: employees
        })
      } else {
        res.redirect('/');
      }
    }
  })
});

app.listen(3000, function() {
  console.log("Application started on port", 3000)
});