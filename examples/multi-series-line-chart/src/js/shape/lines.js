import {drawSchedule} from 'grizzy';

function lineChart(parent, data, helpers){
  let {line, color, x, y} = helpers;
  const speed = 1200;
  const delay = function(d, i) { return i * speed; };
  const pathLens = [];

  return drawSchedule('.graph-line', parent, {
    data: [data, (d) => d.name+'l'],
    is:{

      update: (selection, done) => {
        return selection.filter('.graph-line')
          .transition()
          .duration(1250)
          .style('opacity', .5)
          .call(done)
      },

      enter: (selection, done) => {
        return selection.enter()
          .append("path")
          .attr({
            "class": "graph-line enter",
            "d": (d) => line(d.values)
          })
          .style("stroke", (d) => color(d.name))
          .call(done)

      },

      // gather their lengths... there has to be a way to 
      // calculate this since I would alread have the string 
      // without having to go into DOM
      animate: (selection, done) => {
        let capture = 0;
        selection.filter('.graph-line.enter')
          .forEach(n => capture = n[0].getTotalLength())

        return selection.filter('.graph-line.enter')
          .attr({
            "stroke-dasharray": (d,i) => capture 
              + " " + capture
            ,
            "stroke-dashoffset": (d,i) => capture
          })
          .transition()
            .ease('cubic-in-out')
            .duration(speed)
            .attr("stroke-dashoffset", 0)
            .call(done)
      },

      after: (selection, done) => {
        return selection
          .filter('.graph-line.enter')
          .attr('class', 'graph-line')
          .call(done)
      },

      exit: (selection, done) => {
        return selection.exit().remove()
          .call(done)
      }
    }
  })
}

export default lineChart;