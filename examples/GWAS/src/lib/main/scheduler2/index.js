'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = exports.drawSchedule = undefined;

var _globalKeys = require('./globalKeys');

var _pipeline = require('./pipeline');

var _id = require('./id');

var _id2 = _interopRequireDefault(_id);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * drawSchedule -> manages the heavy lifing of d3 by creating  a 
 * reusable pattern to create graphics.  Note: if setting.data is 
 * `false` parent object will bind only.  Should be returned in a 
 * function.
 *
 * @param{String} (what) -> what will be picked in the selection 
 * @param{Object::Array} (parent) -> the svg that will be render new
 *   images
 * @parm{Object} (settings) -> All of the functionality of the view of
 *   the d3.  must include properties data, and is.
 *
 * example: 
 * (parentObject, data) => {
 *     return drawSchedule("rect.range", parentObject, {
 *       data: data,
 *       is : {
 *         enter : (selection) => {
 *           return selection.enter().append("rect")
 *             .attr({
 *               "class": (d, i) => "range s" + i,
 *               "width": w0,
 *               "height": height,
 *               "x": reverse ? lastScale : 0
 *             })
 *           .transition()
 *             .duration(duration)
 *             .attr({
 *               "width": w1,
 *               "x": reverse ? currentScale : 0
 *             });
 *         },
 *         update : (selection) => {
 *           return selection.transition()
 *             .duration(duration)
 *             .attr({
 *               "x": reverse ? currentScale : 0,
 *               "width": w1,
 *               "height": height
 *             });
 *         },
 *         exit : (selection) => {
 *           return selection.exit().remove();
 *         }
 *       }
 *     });
 *  }
 */
function drawSchedule(what, parent, settings) {
  var data = settings.data,
      is = settings.is;

  var applyArgs = undefined;
  var dataBinder = undefined;

  parent = data === false ? parent : parent.selectAll(what);

  if (!(data instanceof Array && data[1] instanceof Function)) {
    applyArgs = [data];
  } else {
    applyArgs = data;
  }

  if (data) {
    dataBinder = function dataBinder() {
      return parent.data.apply(parent, applyArgs);
    };
  } else {
    dataBinder = function dataBinder() {
      return parent;
    };
  }

  return {
    type: _globalKeys.PRE,
    bind: { dataBinder: dataBinder },
    is: is
  };
}

function load(stringId) {
  // preprocess the transitions
  var key = (0, _id2.default)(stringId);

  for (var _len = arguments.length, transitions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    transitions[_key - 1] = arguments[_key];
  }

  _pipeline.schQ.loader(transitions, key);
}

exports.drawSchedule = drawSchedule;
exports.load = load;