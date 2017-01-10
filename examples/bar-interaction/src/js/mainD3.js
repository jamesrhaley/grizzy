import {dimensions, blankSVG} from 'grizzy';
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
      : (a, b) => d3.ascending(a.letter, b.letter)

  // sort data based off of event
  data.sort(sortFunc);

  // set the x and y domain
  x.domain(data.map((d) => d.letter))
  y.domain([0, d3.max(data, (d) => d.frequency)])

  // render the graph
  xAx(svg, {SIZE, xAxis, delay});

  yAx(svg, {yAxis});

  bar(svg, data, {SIZE, x, y, delay});
}

export {graph}