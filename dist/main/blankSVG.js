"use strict";

/**
* blankSVG -> Creates a new, blank SVG to work on. follows d3 
* conventions of calculating the sizy of the canvas
*
* @param{Number} (width) -> value of width
* @param{Number} (height) -> value of height
* @param{Object} (margin) -> object of top, bottom, left, right of Numbers
* @param{String} (select) -> the id or class of the DOM selection
* 
* example:
* const margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 39.5},
*     width = 960 - margin.right,
*     height = 500 - margin.top - margin.bottom;
* 
* svg = new blankSVG(width, height, margin, '#chart')
*/

function blankSVG(d3local, size, select) {
  select = select !== undefined ? select : 'body';

  return d3local.select(select).append("svg").attr({
    "width": size.width + size.margin.left + size.margin.right,
    "height": size.height + size.margin.top + size.margin.bottom
  }).append("g").attr({
    "transform": "translate(" + size.margin.left + "," + size.margin.top + ")"
  });
}

module.exports = blankSVG;