'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testData = exports.xAxis = exports.y = exports.x = exports.svgParent = exports.size = exports.baseDimensions = undefined;

var _dimensions = require('./dimensions');

var _dimensions2 = _interopRequireDefault(_dimensions);

var _blankSVG = require('./blankSVG');

var _blankSVG2 = _interopRequireDefault(_blankSVG);

var _d = require('d3');

var _d2 = _interopRequireDefault(_d);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * for esdoc
 * @ignore
 */
var baseDimensions = exports.baseDimensions = {
  width: 800,
  height: 500,
  margin: { top: 20, right: 200, bottom: 80, left: 67 }
};

/**
 * for esdoc
 * @ignore
 */
var size = exports.size = (0, _dimensions2.default)(baseDimensions);

/**
 * for esdoc
 * @ignore
 */
var svgParent = exports.svgParent = function svgParent() {
  return (0, _blankSVG2.default)(_d2.default, size);
};

/**
 * for esdoc
 * @ignore
 */
var x = exports.x = _d2.default.scale.ordinal().rangeRoundBands([0, size.width], .1);

/**
 * for esdoc
 * @ignore
 */
var y = exports.y = _d2.default.scale.linear().range([size.height, 0]);

/**
 * for esdoc
 * @ignore
 */
var xAxis = exports.xAxis = _d2.default.svg.axis().scale(x).orient('bottom');

/**
 * for esdoc
 * @ignore
 */
var testData = exports.testData = [{ letter: 'A', frequency: 0.08167 }, { letter: 'B', frequency: 0.01492 }];