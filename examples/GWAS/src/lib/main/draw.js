"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * draw:
 * manages the heavy lifing of d3 by creating  a reusable pattern to 
 * create graphics.  Note: if setting.data is `false` parent object will 
 * bind only.
 *
 * @param {String} what - what will be picked in the selection 
 * @param {D3Object} parent - the svg that will be render new images
 * @param {Object} settings - Object of data and is.
 * @param {Array} settings.data - an Array or an Array of an Array and an
 *  id fuction.
 * @param {Object} settings.is - a function following d3 convention of 
 *   passing the parent to perform d3 methods on.
 * @return {Object}
 * @example 
 * draw("rect.range", container, {
 *   data: rangez,
 *   is : {
 *     enter : (selection) => {
 *       return selection.enter().append("rect")
 *         .attr({
 *           "class": (d, i) => "range s" + i,
 *           "width": w0,
 *           "height": height,
 *           "x": reverse ? lastScale : 0
 *         })
 *       .transition()
 *         .duration(duration)
 *         .attr({
 *           "width": w1,
 *           "x": reverse ? currentScale : 0
 *         });
 *     },
 *     postUpdate : (selection) => {
 *       return selection.transition()
 *         .duration(duration)
 *         .attr({
 *           "x": reverse ? currentScale : 0,
 *           "width": w1,
 *           "height": height
 *         });
 *     },
 *     exit : (selection) => {
 *       return selection.exit().remove();
 *     }
 *   }
 * });
 */
function draw(what, parent, settings) {
  var data = settings.data;
  var create = data === false ? parent : parent.selectAll(what);
  var keys = Object.keys(settings.is);
  var len = keys.length;
  var applyArgs = void 0;

  // I do not believe that I have actually covered all cases
  if (!(data instanceof Array && data[1] instanceof Function)) {
    applyArgs = [data];
  } else {
    applyArgs = data;
  }

  if (data) {
    create = create.data.apply(create, applyArgs);
  }

  for (var i = 0; i < len; i++) {
    create.call(settings.is[keys[i]]);
  }
  return create;
}

exports.default = draw;