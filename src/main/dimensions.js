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
function baseDimensions(width, height, margintop, marginright, marginBottom, marginLeft) {
  var sizeObject = {

    margin : {
      top: margintop, 
      right: marginright,
      bottom: marginBottom,
      left: marginLeft
    },

    width : width - marginLeft - marginright,

    height : height - margintop - marginBottom
  };

  return sizeObject;
}

function dimensions(sizing) {
  var props = ['width', 'height', 'margin'];
  var dim = {};

  props.forEach(prop => {

    if (sizing.hasOwnProperty(prop)) {

      dim[prop] = sizing[prop];

    } else {

      dim[prop] = undefined;
    }
  });

  if (dim['margin'] === undefined) {

    dim['margin'] = {
      top : 0,
      right : 0,
      bottom : 0,
      left : 0,
    };
  }

  return baseDimensions(
    dim['width'],
    dim['height'],
    dim['margin'].top,
    dim['margin'].right,
    dim['margin'].bottom,
    dim['margin'].left
  );
}

export default dimensions;