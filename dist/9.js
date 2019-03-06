(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-odd <https://github.com/jonschlinkert/is-odd>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */


const isNumber = __webpack_require__(10);

module.exports = function isOdd(value) {
  const n = Math.abs(value);

  if (!isNumber(n)) {
    throw new TypeError('expected a number');
  }

  if (!Number.isInteger(n)) {
    throw new Error('expected an integer');
  }

  if (!Number.isSafeInteger(n)) {
    throw new Error('value exceeds maximum safe integer');
  }

  return n % 2 === 1;
};

/***/ })

}]);