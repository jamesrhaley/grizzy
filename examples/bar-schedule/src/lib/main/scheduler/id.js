"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = id;
var idCount = 0;

/**
 * @ignore
 */
function id(key) {
  return key === undefined ? "gz" + idCount++ : "key" + idCount++;
}