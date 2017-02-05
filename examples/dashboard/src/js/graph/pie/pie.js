import {draw} from 'grizzy';

// working on it
function prePie(parent, data, helpers){
  let {color, arc, pie, colorDomain} = helpers;

  if(color.domain().length === 0){
    color.domain(colorDomain);
  }
  
  return draw('.arc', parent, {
    data: [pie(data), (d) => d.data.id],
    is:{
      enter: (selection) => {
        return selection.enter()
          .append('path')
          .attr({
            'class': 'arc',
            'd': arc
          })
          .style('fill', (d) => color(d.data.id))
          .each(function() { 
            this._current = {startAngle: 0, endAngle: 0}; 
          });
      },
      update: (selection) => {
        return selection.transition().duration(1000)
          .attrTween('d', function(d) {
            
            var interpolate = d3.interpolate(this._current, d);
            // bind new data to parent
            this._current = interpolate(0);

            return function(t) {
              return arc(interpolate(t));
            };
          });
      },
      exit: (selection) => {
        return selection.exit()
          .remove();
      }
    }
  });
}

export { prePie };