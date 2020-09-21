/*
============================================
; Title: massie-exercise-7.3.js
; Author: Professor Krasso
; Date: September 20 2020
; Modified By: Sarah Massie
; Description: Testing code using Mocha and Chai
;===========================================
*/
var fruits = require("../massie-fruits.js");
var chai = require("chai");
var assert = chai.assert;

describe("fruits", function() {
    it("should return an array of fruits", function() {
        var f = fruits('Apple,Orange,Mango,Banana,Avocado');
        assert(Array.isArray(f));
    })
})