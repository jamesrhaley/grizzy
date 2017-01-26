import {dimensions, blankSVG, load} from '../lib/index';
import {bar} from './shape/bar';
import {xAx} from './shape/xAx';
import {yAx} from './shape/yAx';


const BASE_DIMENSIONS = {
    width : 960,
    height : 500,
    margin:{top: 20, right: 20, bottom: 30, left: 40}
};

const SIZE = dimensions(BASE_DIMENSIONS);

const svg = blankSVG(d3, SIZE, '#chart');

// helpers
var formatPercent = d3.format(".0%");

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
  .ticks(10, '%')
  .tickFormat(formatPercent);

const delay = (d, i) => i * 50;

function graph(state) {
  let {data, evt} = state;

  let sortFunc = evt
    ? (a, b) => b.frequency - a.frequency
    : (a, b) => d3.ascending(a.letter, b.letter);

  let filterVal = evt
    ? 'A'.charCodeAt()
    : 'E'.charCodeAt();

  // sort data based off of event
  let graphData = data
    .filter(a => a.letter.charCodeAt() > filterVal)
    .sort(sortFunc);

  // set the x and y domain
  x.domain(graphData.map((d) => d.letter))
  y.domain([0, d3.max(graphData, (d) => d.frequency)])

  // render the graph
  load(
    'barGraph',
    yAx(svg, {yAxis}),
    [
      bar(svg, graphData, {SIZE, x, y, delay}),
      xAx(svg, {SIZE, xAxis, delay, x})
    ]
  );
}

export {graph}