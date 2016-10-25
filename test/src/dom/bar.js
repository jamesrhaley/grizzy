import draw from '../../../src/main/draw';

export default function bar(parent, data, helpers){
  let size = helpers.SIZE;
  let x = helpers.x;
  let y = helpers.y;
	return draw('.bar', parent, {
  	data: data,
  	is:{
  		enter: (selection) => {
  			return selection.enter().append('rect')
		      .attr({
		      	'class': 'bar',
		      	'x': (d) => x(d.letter),
		      	'width': x.rangeBand(),
		      	'y': (d) => y(d.frequency),
		      	'height': (d) => size.height - y(d.frequency)
      		});

  		}
  	}
  })
}

