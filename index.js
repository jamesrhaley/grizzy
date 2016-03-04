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
  let create = parent.selectAll(what),
    args = settings.data,
    keys = Object.keys(settings.is),
    len = keys.length;
  
  if (!(args instanceof Array && args[1] instanceof Function)){
    args = [args];
  }

  create = create.data.apply(create, args);

  for (let i = 0; i < len; i++){
    create.call(settings.is[ keys[i] ]);  
  }
}

export { draw };