import {drawSchedule} from 'grizzy';

function chartLines(parent, lineFunc, color) {
  const speed = 1200;
  const delay = function(d, i) { return i * speed; };
  const pathLens = [];

  // create the lines
  parent.append("path")
      .attr({
        "class": "graph-line",
        "d": (d) => {
          return lineFunc(d.values);
        }
      })
      .style("stroke", (d) => color(d.name));

  // gather their lengths... there has to be a way to calculate this
  // since I would alread have the string without having to go into
  // DOM
  parent.selectAll('.graph-line')
    .forEach(node => pathLens.push(node[0].getTotalLength()))

  return parent
    .attr({
      "stroke-dasharray": (d,i) => pathLens[i] + " " + pathLens[i],
      "stroke-dashoffset": (d,i) => pathLens[i]
    })
    .transition().delay(delay)
      .ease('cubic-in-out')
      .duration(speed)
      .attr("stroke-dashoffset", 0);
}

function lineChart(parent, data, helpers){
  let {line, color, x, y} = helpers;

	return drawSchedule('.dot', parent, {
  	data: [data, (d) => d.name+'l'],
  	is:{
      update: (selection,done) => selection.call(done),
  		enter: (selection,done) => {
  			return selection.enter().append("g")
          .attr("class", "city")
          .call(chartLines, line, color)
          .call(done)
          // .call(annotations, x, y);

  		},
      exit: (selection, done) => selection.exit().remove().call(done)
  	}
  })
}

function annotation(parent, data, helpers) {
  let {x,y} = helpers;
  console.log(parent)
  return drawSchedule('.text', parent, {
    data: [data, (d) => d.name+'a'],
    is:{
      enter: (selection,done) => {
        return selection.enter().append('g').append("text")
          .attr("transform", (d) => {
            return "translate(" 
              + x(d.x) 
              + "," 
              + y(d.y) 
              + ")"; 
          })
          .attr("class", "annotations")
          .attr("x", 3)
          .attr("dy", ".35em")
          .text((d) => d.name)
          .call(done);
      },
      exit: (selection,done) => selection.exit().remove().call(done)
    }
  })
}

export { annotation, lineChart };