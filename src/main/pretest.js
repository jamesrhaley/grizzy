import dimensions from './dimensions';
import blankSVG from './blankSVG';
import d3 from 'd3';

const baseDimensions = {
  width : 800,
  height : 500,
  margin: {top: 20, right: 200, bottom: 80, left: 67}
};

const size = dimensions(baseDimensions);

const svgParent = () => blankSVG(d3, size);

const x = d3.scale.ordinal()
  .rangeRoundBands([0, size.width], .1);

const y = d3.scale.linear()
  .range([size.height, 0]);

export {baseDimensions, size, svgParent, x, y};