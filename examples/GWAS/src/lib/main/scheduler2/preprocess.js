'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = preprocess;

var _globalKeys = require('./globalKeys');

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isPre = function isPre(test) {
  return (0, _isPlainObject2.default)(test) ? test.type === _globalKeys.PRE : false;
};

var allBut = function allBut(value, str) {
  return value !== str;
};

var is = function is(value, str) {
  return value === str;
};

var baseAllCheck = function baseAllCheck(fn) {
  return function (arr) {
    for (var i = 0; i < arr.length; i++) {
      if (!fn(arr[i])) {
        return false;
      }
    }
    return true;
  };
};

/** loop an array and see if all instance are Functions */
var isAllFunctions = baseAllCheck(_isFunction2.default);

//const isAllPlainObject = baseAllCheck(isPlainObject);

/**
 * object is nested two level deep. turns all into single obects
 * and flattens into a single array
 * @private
 * @param {Object} data - an object created by drawShedule
 */
function fromDrawObject(data) {
  return Object.keys(data).filter(function (key) {
    return allBut(key, _globalKeys.TYPE);
  }).map(function (key) {
    var innerObject = data[key];

    return Object.keys(innerObject).map(function (innerKey) {

      return {
        type: is(key, _globalKeys.BIND) ? _globalKeys.BIND : _globalKeys.RENDER,
        value: [innerObject[innerKey]]
      };
    });
  }).reduce(function (a, b) {
    return a.concat(b);
  });
}

function formCollection(data) {
  if (isPre(data)) {

    return fromDrawObject(data);
  } else if ((0, _isArray2.default)(data) && isAllFunctions(data)) {

    return [{
      type: _globalKeys.RENDER,
      value: data
    }];
  }
}
/**
 * preprocess:
 *  turn drawSchedule obects into something that be used by
 *  SchQ
 *
 * @param {Array} data -> an Array of mixed object to be converted
 *   to objects each with a properties of type and calls
 */
function preprocess(allStages) {

  return allStages.map(function (stage) {
    return formCollection(stage);
  }).reduce(function (a, b) {
    return a.concat(b);
  });
}