
import {dimensions, blankSVG, load} from 'grizzy';
import lineChart from './shape/lines';
import annotation from './shape/annotation';
import {xAx} from './shape/xAx';
import {yAx} from './shape/yAx';

const BASE_DIMENSIONS = {
    width : 960,
    height : 500,
    margin:{top: 20, right: 80, bottom: 30, left: 50}
};

const SIZE = dimensions(BASE_DIMENSIONS);

const svg = blankSVG(d3, SIZE, '#chart');

// helpers


var x = d3.time.scale()
    .range([0, SIZE.width]);

var y = d3.scale.linear()
    .range([SIZE.height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("basis")
    .x((d) => x(d.date))
    .y((d) => y(d.temperature));


function graph(state) {
  const {cities, cityLabels, keys, xDomain, yDomain} = state

  x.domain(xDomain);

  y.domain(yDomain);

  xAx(svg, {SIZE, xAxis});

  yAx(svg, {yAxis});

  load(
    'lineChart',
    lineChart(svg, cities, {line, color, x, y}),
    annotation(svg, cityLabels, {x,y})
  );
}

export default graph;
