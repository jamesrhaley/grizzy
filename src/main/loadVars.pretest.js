import dimensions from './dimensions';
import blankSVG from './blankSVG';
import d3 from 'd3';


export const baseDimensions = {
  width : 800,
  height : 500,
  margin: {top: 20, right: 200, bottom: 80, left: 67}
};

export const size = dimensions(baseDimensions);

export const svgParent = () => blankSVG(d3, size);

export const x = d3.scale.ordinal()
  .rangeRoundBands([0, size.width], .1);

export const y = d3.scale.linear()
  .range([size.height, 0]);

export const xAxis = d3.svg.axis()
  .scale(x)
  .orient('bottom');
