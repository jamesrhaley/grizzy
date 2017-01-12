import {drawSchedule} from '../../lib/index';

let start = true;

function yAx(parent, helpers){
  let {yAxis} = helpers;

  return drawSchedule('x axis', parent, {
    data: false,
    is: {
      update: (selection, done) => {
        selection.transition()
          .duration(750)
          .select(".y.axis")
          .call(yAxis)
          .selectAll("g")
          .call(done)
      },
      enter: (selection, done)=> {
        let axis = selection;

        if (start) {
            start = false;

        axis.append('g')
          .attr({
            'class': 'y axis'
          })
          .call(yAxis)
          .append('text')
            .attr({
              'transform': 'rotate(-90)',
              'y': 6,
              'dy': '.71em'
            })
            .style('text-anchor', 'end')
            .text('Frequency');
        }
        
        return axis.call(done);
      }
    }
  });
}

export {yAx};