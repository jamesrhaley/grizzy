import {drawSchedule} from 'grizzy';

let start = true;
function xAx(parent, helpers){
  let xAxis = helpers.xAxis;
  let height = helpers.SIZE.height;
  // console.log()
  return drawSchedule('x axis', parent, {
    data: false,
    is:{
      enter: (selection, done)=> {
        let axis = selection
        if (start) {
            start = false;

        axis.append('g')
          .attr({
            'class': 'x axis',
            'transform': 'translate(0,' + height + ')'
          })
          .style({
            'opacity': 0
          })
          .transition().delay(100)
          .style({
            'opacity': 1
          })
          .call(xAxis);
        }
        return axis
          .call(done);
      }
    }
  })
}


export {xAx};