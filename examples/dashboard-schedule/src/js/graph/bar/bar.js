import { drawSchedule } from 'grizzy';

function bar(parent, data, helpers){
  let {SIZE, y} = helpers;

  return drawSchedule('.bar', parent, {
    data: data,
    is:{
      enter: (selection, done) => {
        return selection.enter().append('rect')
          .attr({
            'class': 'bar',
            'x': (d) => 4,
            'width': SIZE.width - 4,
            'y': (d) => SIZE.height,
            'height': 0
          })
          .style('fill', '#8a89a6')
          .call(done)
      },
      update: (selection, done) => {
        return selection.transition()
          .attr('y', (d) => y(d.total))
          .attr('height', (d) => y(0) - y(d.total))
          .call(done)
      }
    }
  });
}

export {bar};