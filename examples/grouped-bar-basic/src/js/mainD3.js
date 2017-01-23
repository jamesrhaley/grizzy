import { dimensions, blankSVG } from 'grizzy';
import { barGrouped } from './shape/bar';
import { xAx } from './shape/xAx';

var zip = (arrays) =>
    arrays[0].map((_,i) =>
        arrays.map((array) => array[i]));

var concatAll = (arrays) => [].concat.apply([], arrays);

var zipConcatAll = arrays => concatAll(zip(arrays));

const SIZE = dimensions({
  width : 960,
  height : 500,
  margin:{top: 40, right: 10, bottom: 20, left: 10}
});

const svg = blankSVG(d3, SIZE, '#chart');

//helpers
const x = d3.scale.ordinal()
  .rangeRoundBands([0, SIZE.width], .08);

const y = d3.scale.linear()
  .range([SIZE.height, 0]);

// axis
const xAxis = d3.svg.axis()
  .scale(x)
  .tickSize(0)
  .tickPadding(6)
  .orient('bottom');

function graph(state, data) {
  const {rows, collumns, groups, yGroupMax, yStackMax} = data;

  x.domain(d3.range(collumns));

  y.domain([0, yStackMax]);

  barGrouped(
    svg,
    zipConcatAll(groups),
    {SIZE, x, y, state, yGroupMax, yStackMax, rows}
  );

  xAx(svg, {xAxis,SIZE});
}

export {graph}