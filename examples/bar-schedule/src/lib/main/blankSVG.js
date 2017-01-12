'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
* blankSVG: Creates a new, blank SVG to perform d3 methods on.
*
* @param {D3} d3local - d3 instance for your code
* @param {Object} size - dimensions of the chart
* @param {String} [select='body'] - the id or class of the DOM selection
* @return {D3Object} an Array that contains the update/enter methods
* 
* @see {@link dimensions}
*
* @example
* import d3 from 'd3';
*
* var SIZE = dimensions({
*     width : 600,
*     height : 500,
*     margin:{top: 10, right: 30, bottom: 10, left: 20}
* });
* 
* svg = new blankSVG(d3, SIZE, '#chart')
*/

function blankSVG(d3local, size, select) {
  select = select !== undefined ? select : 'body';
  // console.log(select)
  return d3local.select(select).append('svg').attr({
    'width': size.width + size.margin.left + size.margin.right,
    'height': size.height + size.margin.top + size.margin.bottom
  }).append('g').attr({
    'transform': 'translate(' + size.margin.left + ',' + size.margin.top + ')'
  });
}

exports.default = blankSVG;