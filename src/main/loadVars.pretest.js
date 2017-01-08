import dimensions from './dimensions';
import blankSVG from './blankSVG';
import d3 from 'd3';

/**
 * for esdoc
 * @ignore
 */
export const baseDimensions = {
  width : 800,
  height : 500,
  margin: {top: 20, right: 200, bottom: 80, left: 67}
};

/**
 * for esdoc
 * @ignore
 */
export const size = dimensions(baseDimensions);

/**
 * for esdoc
 * @ignore
 */
export const svgParent = () => blankSVG(d3, size);

/**
 * for esdoc
 * @ignore
 */
export const x = d3.scale.ordinal()
  .rangeRoundBands([0, size.width], .1);

/**
 * for esdoc
 * @ignore
 */
export const y = d3.scale.linear()
  .range([size.height, 0]);

/**
 * for esdoc
 * @ignore
 */
export const xAxis = d3.svg.axis()
  .scale(x)
  .orient('bottom');

/**
 * for esdoc
 * @ignore
 */
export const testData = [
  {letter: 'A', frequency: 0.08167},
  {letter: 'B', frequency: 0.01492}
];