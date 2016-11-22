import {drawSchedule} from 'grizzy';


let start = true;
function yAx(parent, helpers){
  let yAxis = helpers.yAxis;
  return drawSchedule('x axis', parent, {
    data: false,
    is:{
      enter: (selection, done)=> {
        let axis = selection
        if (start) {
          start = false;

          axis.append('g')
            .attr({
              'class': 'y axis'
            })
            .style({
              'opacity': 0
            })
            .transition().delay(100)
            .style({
              'opacity': 1
            })
            .call(yAxis)
            // .append('text')
            //   .attr({
            //     'transform': 'rotate(-90)',
            //     'y': 6,
            //     'dy': '.71em'
            //   })
            //   .style('text-anchor', 'end')
            //   .text('Frequency')
          }
        
        return axis
          .call(done);
      }
    }
  })
}

export {yAx};