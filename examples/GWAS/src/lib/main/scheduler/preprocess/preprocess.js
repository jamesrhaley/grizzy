'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = preprocess;

var _moduleKeys2 = require('./../moduleKeys');

var _moduleKeys3 = _interopRequireDefault(_moduleKeys2);

var _manyDrawObjects = require('./manyDrawObjects');

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _moduleKeys = (0, _moduleKeys3.default)(),
    BIND = _moduleKeys.BIND,
    PRE = _moduleKeys.PRE,
    RENDER = _moduleKeys.RENDER,
    TYPE = _moduleKeys.TYPE;

var isPre = function isPre(test) {
  return (0, _isPlainObject2.default)(test) ? test.type === PRE : false;
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

var isAllPre = baseAllCheck(isPre);
//const isAllPlainObject = baseAllCheck(isPlainObject);

/**
 * object is nested two level deep. turns all into single objects
 * and flattens into a single array
 * @private
 * @param {Object} data - an object created by drawShedule
 */
function fromDrawObject(data) {
  return Object.keys(data).filter(function (key) {
    return allBut(key, TYPE);
  }).map(function (key) {
    var innerObject = data[key];

    return Object.keys(innerObject).map(function (innerKey) {

      return {
        type: is(key, BIND) ? BIND : RENDER,
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
  } else if (data.length > 1 && isAllPre(data)) {

    return (0, _manyDrawObjects.manyDrawObjects)(data);
  } else if ((0, _isArray2.default)(data) && isAllFunctions(data)) {

    return [{
      type: RENDER,
      value: data
    }];
  } else {
    throw new Error('must be Object or Function');
  }
}
/**
 * preprocess:
 *  turn drawSchedule obects into something that be used by
 *  SchQ
 *
 * for esdoc
 * @ignore
 * @param {Array} allStages - an Array of mixed object to be converted
 *   to objects each with a properties of type and calls
 */
function preprocess(allStages) {

  return allStages.map(function (stage) {
    return formCollection(stage);
  }).reduce(function (a, b) {
    return a.concat(b);
  });
}