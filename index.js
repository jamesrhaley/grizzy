/**
* draw -> manages the heavy lifing of d3 by creating  a reusable
* pattern to create graphics
*
* @param{String} (what) -> what will be picked in the selection 
* @param{Object::Array} (parent) -> the svg that will be render new
*   images
* @parm{Object} (settings) -> All of the functionality of the view of
*   the d3.  must include properties data, and is.
* example: 
*     draw("rect.range", container, {
*       data: rangez,
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
*         postUpdate : (selection) => {
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
*/

function draw(what, parent, settings){
  var create = parent.selectAll(what),
    args = settings.data,
    keys = Object.keys(settings.is),
    len = keys.length;
  
  if (!(args instanceof Array && args[1] instanceof Function)){
    args = [args];
  }

  create = create.data.apply(create, args);

  for (var i = 0; i < len; i++){
    create.call(settings.is[ keys[i] ]);  
  }
  return create;
}

/**
* BlankSVG -> Creates a new, blank SVG to work on. follows d3 
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
* svg = new BlankSVG(width, height, margin, '#chart')
*/
function BlankSVG(width, height, margin, select) {
    select = select !== undefined ? select : 'body';

    return d3.select(select)
        .append("svg")
        .attr({
            "width": (width + margin.left + margin.right),
            "height": (height + margin.top + margin.bottom)
        })
      .append("g")
        .attr({
            "transform": "translate(" 
                + margin.left 
                + "," 
                + margin.top 
                + ")"
        });
}

module.exports = {
  draw:draw,
  BlankSVG:BlankSVG
}