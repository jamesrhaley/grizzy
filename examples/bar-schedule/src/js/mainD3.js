
import grizzy, * as gz from 'grizzy';
import {bar} from './shape/bar';
import {xAx} from './shape/xAx';
import {yAx} from './shape/yAx';

const dimensions = gz.dimensions;
const blankSVG = gz.blankSVG;
const load = gz.load;

const BASE_DIMENSIONS = {
    width : 960,
    height : 500,
    margin:{top: 20, right: 20, bottom: 30, left: 40}
};

const SIZE = dimensions(BASE_DIMENSIONS);

const svg = blankSVG(d3, SIZE, '#chart');

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

  load(
    bar(svg, data, {SIZE,x,y}),
    yAx(svg, {yAxis}),
    xAx(svg, {SIZE, xAxis})
  );
}

export {graph}