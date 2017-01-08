"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = id;
var idCount = 0;

function id(key) {
  return key + idCount++;
}