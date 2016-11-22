import dimensions from '../../../src/main/dimensions';
import blankSVG from '../../../src/main/blankSVG';
import draw from '../../../src/main/draw';
import bar from './bar';


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


export default function graph(data, asyncTest) {
  let xVal = x.domain(data.map((d) => d.letter));
  
  let yVal = y.domain([0, d3.max(data, (d) => d.frequency)]);

	let testObject = bar(svg, data, {SIZE,x,y});

	let aTest = asyncTest(testObject);
	
	return {xVal, yVal, testObject, aTest}
}