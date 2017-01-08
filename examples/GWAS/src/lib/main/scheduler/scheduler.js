'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = exports.drawSchedule = undefined;

var _main = require('./main');

var _scheduler_globals = require('./scheduler_globals');

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
  var data = settings.data;
  var create = data === false ? parent : parent.selectAll(what);
  var keys = Object.keys(settings.is);
  var len = keys.length;
  var is = settings.is;
  var applyArgs = undefined;
  var dataBinder = undefined;

  if (!(data instanceof Array && data[1] instanceof Function)) {
    applyArgs = [data];
  } else {
    applyArgs = data;
  }

  if (data) {
    dataBinder = function dataBinder() {
      return create.data.apply(create, applyArgs);
    };
  } else {
    dataBinder = function dataBinder() {
      return create;
    };
  }

  return {
    type: _scheduler_globals.PRE_BIND,
    // if problems up comment this out
    // parent: create,
    dataBinder: dataBinder,
    is: is,
    keys: keys,
    len: len
  };
}

/**
 * load-> create a series of transition to occur in your visualization. 
 * Each one will happen after the pervious one completes.
 *  
 * @param{Object} (transitions) -> any number of object created by
 *   a drawSchedule function
 */
function load() {
  for (var _len = arguments.length, transitions = Array(_len), _key = 0; _key < _len; _key++) {
    transitions[_key] = arguments[_key];
  }

  _main.loadSubject.onNext({
    type: _scheduler_globals.LOAD,
    time: Date.now(),
    transitions: transitions
  });

  return transitions;
}

exports.drawSchedule = drawSchedule;
exports.load = load;