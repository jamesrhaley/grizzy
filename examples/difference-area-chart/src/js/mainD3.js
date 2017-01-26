
import {dimensions, blankSVG, draw} from 'grizzy';
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
var x = d3.time.scale()
    .range([0, SIZE.width]);

var y = d3.scale.linear()
    .range([SIZE.height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom');

var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left');

var line = d3.svg.area()
    .interpolate('basis')
    .x((d) => x(d.date))
    .y((d) => y(d['New York']));

var line2 = d3.svg.area()
    .interpolate('basis')
    .x((d) => x(d.date))
    .y((d) => y(d['New York']));

var area = d3.svg.area()
    .interpolate('basis')
    .x((d) => x(d.date))
    .y1((d) => y(d['New York']));


function graph(data) {
  x.domain(d3.extent(data, (d) => d.date));

  y.domain([
    d3.min(data, (d) => Math.min(d['New York'], d['San Francisco'])),
    d3.max(data, (d) => Math.max(d['New York'], d['San Francisco']))
  ]);
  
  let allreadyBoundData = svg.datum(data);

  draw('#chart', allreadyBoundData, {
    data: false,
    is: {
      clipPathBellow: (selection) => {
        return selection.append('clipPath')
            .attr('id', 'clip-below')
          .append('path')
            .attr('d', area.y0(SIZE.height));
      },

      clipPathAbove: (selection) => {
        return selection.append('clipPath')
            .attr('id', 'clip-above')
          .append('path')
            .attr('d', area.y0(0));
      },

      areaAbove: (selection) => {
        return selection.append('path')
          .attr({
            'class': 'area above',
            'clip-path': 'url(#clip-above)',
            'd': area.y0((data) => y(data['San Francisco']))
          });
      },

      areaBelow: (selection) => {
        return selection.append('path')
          .attr({
            'class': 'area below',
            'clip-path': 'url(#clip-below)',
            'd': (d) => area(d)
          });
      },

      line: (selection) => {
        return selection.append('path')
          .attr({
            'class': 'line',
            'd': (d) => line(d)
          });
      },
    }
  });

  xAx(svg, {SIZE, xAxis});

  yAx(svg, {yAxis});

}

export {graph};
