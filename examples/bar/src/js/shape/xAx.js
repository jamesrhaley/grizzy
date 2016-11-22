import grizzy, * as gz from 'grizzy';
const draw = grizzy.draw;

let start = true;
function xAx(parent, helpers){
  let xAxis = helpers.xAxis;
  let height = helpers.SIZE.height;
  // console.log()
  return draw('x axis', parent, {
    data: false,
    is:{
      enter: (selection)=> {
        let axis = selection
        if (start) {
            start = false;

        axis.append('g')
          .attr({
            'class': 'x axis',
            'transform': 'translate(0,' + height + ')'
          })
          .call(xAxis);
        }
        return axis
      }
    }
  })
}

export {xAx};