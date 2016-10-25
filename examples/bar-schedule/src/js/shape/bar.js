import {drawSchedule} from 'grizzy';

function bar(parent, data, helpers){
  let size = helpers.SIZE;
  let x = helpers.x;
  let y = helpers.y;
	return drawSchedule('.bar', parent, {
  	data: data,
  	is:{
  		enter: (selection, done) => {
  			return selection.enter().append('rect')
		      .attr({
		      	'class': 'bar',
		      	'x': (d) => x(d.letter),
		      	'width': x.rangeBand(),
		      	'y': (d) => 0,
		      	'height': (d) => size.height - y(d.frequency)
      		})
          .style({
            'opacity': 0
          })
          .transition().delay(100)
          .attr({
            "y": (d) => y(d.frequency)
          })
          .style({
            'opacity': 1
          })
          .call(done);

  		}
  	}
  })
}

export { bar };