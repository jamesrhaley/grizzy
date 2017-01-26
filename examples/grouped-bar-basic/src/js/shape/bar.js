import { draw } from 'grizzy';

const DELAY = (d, i) => i * 8;

const DURATION = 120;

function transitionGrouped(selection, helpers) {
  let {x, y, yGroupMax, SIZE, num} = helpers;

  y.domain([0, yGroupMax]);

  selection.transition()
      .duration(DURATION)
      .delay(DELAY)
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


function transitionStacked(selection, helpers) {
  let {x, y, yStackMax} = helpers;

  y.domain([0, yStackMax]);

  selection.transition()
      .duration(DURATION)
      .delay(DELAY)
      .attr( {
        y: (d) => y(d.y0 + d.y),
        height: (d) => y(d.y0) - y(d.y0 + d.y)
    } )
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
          });
      },

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
      }
    }
  });
}


export { barGrouped };