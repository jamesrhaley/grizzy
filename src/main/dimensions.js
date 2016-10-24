/**
* dimensions -> follows the general d3 sizing rules with margins
* the goal is have a cleaner way of coding the absolute width and 
* the dimensions the graph will fall in.
*
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

  props.forEach((value, index) => {
    for (var prop in sizing) {

      if (sizing.hasOwnProperty(value)) {
        dim[index] = sizing[value]
      } else {
        dim[index] = undefined
      }
    }
  });

  if (dim[2] === undefined) {
    dim[2] = {
      top : 0,
      right : 0,
      bottom : 0,
      left : 0,
    }
  }

  return baseDimensions(dim[0], dim[1], dim[2].top, dim[2].right, 
                       dim[2].bottom,  dim[2].left);
}

module.exports = dimensions;