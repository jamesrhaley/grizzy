'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheduleSubject = exports.loadSubject = undefined;

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadSubject = exports.loadSubject = new _rx2.default.ReplaySubject(1);
var scheduleSubject = exports.scheduleSubject = new _rx2.default.ReplaySubject(1);