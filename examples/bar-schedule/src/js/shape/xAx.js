import {drawSchedule} from '../../lib/index';

let start = true;

function xAx(parent, helpers){
  let {xAxis, SIZE, delay, x} = helpers;

  return drawSchedule('x axis', parent, {
    data: false,
    is:{
      exit: (selection, done) => {
        return selection.call(done)
      },
      update: (selection, done) => {
        console.log(x.domain());
        selection.transition()
          .duration(750)
          .select(".x.axis")
          .call(xAxis)
          .selectAll("g")
          .delay(delay)
          .call(done)
      },
      enter: (selection, done)=> {
        let axis = selection;

        if (start) {
            start = false;

        axis.append('g')
          .attr({
            'class': 'x axis',
            'transform': 'translate(0,' + SIZE.height + ')'
          })
          .call(xAxis)
        }

        return axis.call(done);
      }
    }
  });
}

export {xAx};