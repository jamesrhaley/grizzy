import {drawSchedule} from '../../lib/index';

function bar(parent, data, helpers){
  let {SIZE, x, y, delay} = helpers;

  return drawSchedule('.bar', parent, {
    data: [data, (d)=> d.letter],
    is:{
      exit: (selection, done) => {
        return selection.exit()
          .transition()
          .duration(750)
          //.delay(delay)
          .attr({
            'y': (d) => SIZE.height,
            'height': (d) => 0
          })
          .remove()
          .call(done)
      },
      update: (selection, done) => {
        return selection
          .transition()
          .duration(750)
          .delay(delay)
          .attr({
            "x": (d) => x(d.letter),
            'width': x.rangeBand(),
            'y': (d) => y(d.frequency),
            'height': (d) => SIZE.height - y(d.frequency)
          })
          .call(done)
      },
      enter: (selection, done) => {
        return selection.enter()
          .append('rect')
          .attr({
            'class': 'bar',
            'x': (d) => x(d.letter),
            'width': x.rangeBand(),
            'y': (d) => SIZE.height,
            'height': (d) => 0
          })
          .transition()
          .duration(750)
          .delay(delay)
          .attr({
            'y': (d) => y(d.frequency),
            'height': (d) => SIZE.height - y(d.frequency)
          })
          .call(done);
      }
    }
  });
}

export { bar };