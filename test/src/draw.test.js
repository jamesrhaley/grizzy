import {expect} from 'chai';
import dimensions from '../../src/main/dimensions';
import blankSVG from '../../src/main/blankSVG';
import draw from '../../src/main/draw';
import bar from './dom/bar';
import Rx from 'rx';

// tests for draw.test.js
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



const FILE = 'data.tsv';

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
