import { drawSchedule } from 'grizzy';

function prePie(parent, data, helpers){
  let {color, arc, pie, colorDomain} = helpers;

  if(color.domain().length === 0){
    color.domain(colorDomain);
  }
  
  return drawSchedule('.pie', parent, {
    data: [pie(data), (d) => d.data.id],
    is:{
      enter: (selection, done) => {
        return selection.enter()
          .append('path')
          .attr({
            'class': 'pie',
            'd': (d) => arc(d)
          })
          .style({
            'fill': (d) => color(d.data.id),
            'opacity': 0
          })
          .each(function(d) { this._current = d; })
          .call(done);
      },
      update: (selection, done) => {
        return selection.transition().duration(500)
          .style('opacity', 1)
          .attrTween('d', function(d) {
            this._current = this._current || d;

            var interpolate = d3.interpolate(this._current, d);
            // bind new data to parent
            this._current = interpolate(0);

            return function(t) {
              return arc(interpolate(t));
            };
          })
          .call(done);
      },
      exit: (selection, done) => {
        return selection.exit()
          .remove()
          .call(done);
      }
    }
  });
}
function setOpacity(parent, selection) {
  return (opacity, time) =>
    drawSchedule(selection, parent, {
      data: false,
      is:{
        dim: (selection, done) => {
          return selection.transition().duration(time)
            .style({
              'opacity': opacity
            })
            .call(done);
        }
      }
    })
}

export { prePie, setOpacity };