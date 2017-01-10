import {draw} from 'grizzy';

function bar(parent, data, helpers){
  let {SIZE, x, y, delay} = helpers;

  return draw('.bar', parent, {
    data: [data, (d)=> d.letter],
    is:{
      update: (selection) => {
        return selection
          .transition()
          .duration(750)
          .delay(delay)
          .attr("x", (d) => x(d.letter))
      },
      enter: (selection) => {
        return selection.enter()
          .append('rect')
          .attr({
            'class': 'bar',
            'x': (d) => x(d.letter),
            'width': x.rangeBand(),
            'y': (d) => y(d.frequency),
            'height': (d) => SIZE.height - y(d.frequency)
          });
      }
    }
  });
}

export { bar };