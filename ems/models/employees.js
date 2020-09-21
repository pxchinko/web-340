/*
============================================
; Title:  employees.js
; Author: Sarah Massie
; Date:   20 September 2020
; Description: File for the employees database model
;===========================================
*/

// require statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// employees schema
let EmployeesSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

// export the model so its publicly available
module.exports = mongoose.model('Employee', EmployeesSchema);