import { draw } from 'grizzy';

function bar(parent, data, helpers){
  let {SIZE, y} = helpers;

  return draw('.bar', parent, {
    data: data,
    is:{
      enter: (selection) => {
        return selection.enter().append('rect')
          .attr({
            'class': 'bar',
            'x': (d) => 4,
            'width': SIZE.width - 4,
            'y': (d) => SIZE.height,
            'height': 0
          })
          .style("fill", "#aaa")
      },
      update: (selection) => {
        return selection.transition()
          .attr("y", (d) => y(d.total))
          .attr("height", (d) => y(0) - y(d.total));
      }
    }
  });
}

export {bar};