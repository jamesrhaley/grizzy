import {expect} from 'chai';
import dimensions from '../../src/main/dimensions';
import blankSVG from '../../src/main/blankSVG';
import draw from '../../src/main/draw';

import Rx from 'rx';

function loadData(file) {
	return Rx.Observable.create(observer => {
      d3.tsv(file, data => observer.next(data));
	  })
		.map(each => {
	    return each.map(d => {
	    	return {
	    		frequency: +d.frequency,
	    		letter: d.letter
	    	};
	    })
		});
}

const FILE = 'data.tsv';

loadData(FILE)
	.subscribe(state => graph(state));


const BASE_DIMENSIONS = {
    width : 960,
    height : 500,
    margin:{top: 20, right: 20, bottom: 30, left: 40}
};

const SIZE = dimensions(BASE_DIMENSIONS);

const svg = blankSVG(d3, SIZE, '#app-test');

// helpers
const x = d3.scale.ordinal()
  .rangeRoundBands([0, SIZE.width], .1);

const y = d3.scale.linear()
  .range([SIZE.height, 0]);

// axis
const xAxis = d3.svg.axis()
  .scale(x)
  .orient('bottom');

const yAxis = d3.svg.axis()
  .scale(y)
  .orient('left')
  .ticks(10, '%');


function graph(data) {
  x.domain(data.map((d) => d.letter));
  y.domain([0, d3.max(data, (d) => d.frequency)]);

	let testObject = bar(svg, data, {SIZE,x,y});

	asyncTest(testObject);
}

function bar(parent, data, helpers){
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

function asyncTest(testValue) {
	describe('grizzy.draw', () => {
		it('should run async', () => {
			expect(true).to.be.true;
		})

		it('should be an array of 26 objects created by d3', () => {
			expect(testValue[0].length === 26).to.be.true;
		})
	});
}