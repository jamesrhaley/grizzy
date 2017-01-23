import { draw } from 'grizzy';

let delay = (d, i) => i * 12;

function transitionGrouped(selection, helpers) {
  let {x, y, yGroupMax, SIZE, num} = helpers;

  y.domain([0, yGroupMax]);

  selection.transition()
      .duration(500)
      .delay(delay)
      .attr({
        x: d => x(d.x) + x.rangeBand() / num * d.row,
        width: x.rangeBand() / num
      })
    .transition()
      .attr({
        y: (d) => y(d.y),
        height: (d) => SIZE.height - y(d.y)
      });
}

// function to set y cords when stacked
let stackY = (y) => ({
  y: (d) => y(d.y0 + d.y),
  height: (d) => y(d.y0) - y(d.y0 + d.y)
});

function transitionStacked(selection, helpers) {
  let {x, y, yStackMax} = helpers;

  y.domain([0, yStackMax]);

  selection.transition()
      .duration(500)
      .delay(delay)
      .attr( stackY(y) )
    .transition()
      .attr({
        x: (d) => x(d.x),
        width: x.rangeBand()
      });
}

function barGrouped(parent, data, helpers){
  let {SIZE, x, y, state, yGroupMax, yStackMax, rows} = helpers;

  return draw('rect', parent, {
    data : [data, (d) => d._id],
    is : {
      exit: (selection) => selection.exit().remove(),
      update: (selection) => {

        if (state.type === "grouped") {

          return selection.call(
            transitionGrouped,
            { x, y, yGroupMax, SIZE, num : rows }
          );
          
        }
        else {

          return selection.call(
            transitionStacked,
            { x, y, yStackMax }
          );
        }
      },
      enter: (selection) => {
        return selection.enter().append('rect')
          .attr({
            class: 'bar',
            x: (d) => x(d.x),
            y: SIZE.height,
            width: x.rangeBand(),
            height: 0
          })        
          .style({
            'fill': d => d.color
          })
          .transition()
            .delay(delay)
            .attr( stackY(y) );
      }
    }
  });
}


export { barGrouped };