/*
============================================
; Title: massie-exercise-7.2.js
; Author: Professor Krasso
; Date: September 18 2020
; Modified By: Sarah Massie
; Description: Testing code using Mocha and Chai
;===========================================
*/
var assert = require("assert");

describe("String#split", function() {
  it("should return an array of names", function() {
    assert(Array.isArray('Monkey,Hamlet,Calvin'.split(',')));
  });
});