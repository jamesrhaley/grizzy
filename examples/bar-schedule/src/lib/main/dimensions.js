'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @ignore
 */
function baseDimensions(width, height, margintop, marginright, marginBottom, marginLeft) {
  var sizeObject = {

    margin: {
      top: margintop,
      right: marginright,
      bottom: marginBottom,
      left: marginLeft
    },

    width: width - marginLeft - marginright,

    height: height - margintop - marginBottom
  };

  return sizeObject;
}

/**
* dimensions: 
* Follows the general d3 sizing rules to make it easier to reason about
* the size and margins of the d3
* the goal is have a cleaner way of coding the absolute width and 
* the dimensions the graph will fall in.
*
* @param {Object} sizing - object of width, heigh, and margins
* @param {Object} sizing.width - total height
* @param {Object} sizing.height - total width
* @param {Object} [sizing.margin=0] - all margins
* @param {Object} sizing.margin.top - top margin
* @param {Object} sizing.margin.right - right margin
* @param {Object} sizing.margin.bottom - bottom margin
* @param {Object} sizing.margin.left - left margin
* @return {Object} - dimensions for d3 DOM object
*
* @example
* var SIZE = dimensions({
*     width : 600,
*     height : 500,
*     margin:{top: 10, right: 30, bottom: 10, left: 20}
* });
*/
function dimensions(sizing) {
  var props = ['width', 'height', 'margin'];
  var dim = {};

  props.forEach(function (prop) {

    if (sizing.hasOwnProperty(prop)) {

      dim[prop] = sizing[prop];
    } else {

      dim[prop] = undefined;
    }
  });

  if (dim['margin'] === undefined) {

    dim['margin'] = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }

  return baseDimensions(dim['width'], dim['height'], dim['margin'].top, dim['margin'].right, dim['margin'].bottom, dim['margin'].left);
}

exports.default = dimensions;