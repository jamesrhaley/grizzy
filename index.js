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
* dimensions -> follows the general d3 sizing rules with margins
* @param{Object} (sizing) -> object of width, heigh, 
* margin{top,right,bottom,left}. if margin is left off then all
* margins are set to zero.
* example:
* var SIZE = dimensions({
*     width : window.innerWidth - 600,
*     height : window.innerHeight*.9,
*     margin:{top: 10, right: 30, bottom: 10, left: 20}
* });
*/
function baseDimensions(width, height) {
      var margintop = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
      var marginright = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
      var marginBottom = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
      var marginLeft = arguments.length <= 5 || arguments[5] === undefined ? 0 : arguments[5];

      var sizeObject = {
          margin : {
              top: margintop, 
              right: marginright,
              bottom: marginBottom,
              left: marginLeft
          },
          width : width - marginLeft - marginright,
          height : height - margintop - marginBottom
      }
      return sizeObject;
  }

function dimensions(sizing) {
    var props = ['width', 'height', 'margin'];
    var dim = {};

    props.forEach(function(value, index) {
      for (prop in sizing) {
        if (sizing.hasOwnProperty(value)) {
          dim[index] = sizing[value]
        } else {
          dim[index] = undefined
        }
      }
    })
    
    if (dim[2] === undefined) {
      dim[2] = {
        top : 0,
        right : 0,
        bottom : 0,
        left : 0,
      }
    }
    return baseSize(dim[0], dim[1], dim[2].top, dim[2].right, 
                    dim[2].bottom,  dim[2].left);
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
//!!!!!!!!!! this needs to be fixed make sure this works cross
// all samples
function blankSVG(d3local, size, select) {
    select = select !== undefined ? select : 'body';

    return d3local.select(select)
        .append("svg")
        .attr({
            "width": (
                size.width 
                + size.margin.left 
                + size.margin.right
            ),
            "height": (
                size.height
                + size.margin.top
                + size.margin.bottom
            )
        })
      .append("g")
        .attr({
            "transform": "translate(" 
                + size.margin.left 
                + "," 
                + size.margin.top 
                + ")"
        });
}

module.exports = {
  draw:draw,
  dimensions:dimensions,
  BlankSVG:BlankSVG,
  blankSVG:blankSVG
}