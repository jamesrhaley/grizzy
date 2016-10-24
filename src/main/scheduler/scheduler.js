var Rx = require('rx');
var {queueSubject} = require('./main');
var {
  LOAD, BIND, PRE_BIND
} = require('./scheduler_globals');

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
function drawSchedule(what, parent, settings){
  let data = settings.data
  , create = data === false ? parent : parent.selectAll(what)
  , keys = Object.keys(settings.is)
  , len = keys.length
  , is = settings.is
  , applyArgs = undefined
  , dataBinder;

  if (!(data instanceof Array 
        && data[1] instanceof Function)){
    applyArgs = [data];
  } else {
    applyArgs = data;
  }

  if (data) {
    dataBinder = () => {
      return create.data.apply(create, applyArgs);
    }
  } else {
    dataBinder = () => {
      return create;
    }
  }

  return {
    type: PRE_BIND,
    // if problems up comment this out
    // parent: create,
    dataBinder,
    is,
    keys,
    len
  }
}

/**
 * load-> create a series of transition to occur in your visualization. 
 * Each one will happen after the pervious one completes.
 *  
 * @param{Object} (transitions) -> any number of object created by
 *   a drawSchedule function
 */
function load(...transitions){
  queueSubject.onNext({
    type: LOAD,
    time: Date.now(),
    transitions
  });

  return transitions;
}

module.exports = { drawSchedule, load };
