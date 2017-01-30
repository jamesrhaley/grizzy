
import {dimensions, blankSVG, draw, drawSchedule, load} from 'grizzy';
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

let start = true;

function graph(data) {
  x.domain(d3.extent(data, (d) => d.date));

  y.domain([
    d3.min(data, (d) => Math.min(d['New York'], d['San Francisco'])),
    d3.max(data, (d) => Math.max(d['New York'], d['San Francisco']))
  ]);

  let allreadyBoundData = svg.datum(data);

  // this could be in a different file but I want to get a better
  // idea if this is the cleanest way of getting it done first
  let diffChart = drawSchedule('#chart', allreadyBoundData, {
    data: false,
    is: {
      // one
      update_ClipPathBellow: (selection, done) => {
        return selection.select('clip-below')
          .attr('d', area.y0(SIZE.height))
          .call(done);
      },

      clipPathBellow: (selection, done) => {
        if (start) {
          return selection.append('clipPath')
              .attr('id', 'clip-below')
            .append('path')
              .attr('d', area.y0(SIZE.height))
              .call(done);
        }

        return selection.call(done);
      },

      // two
      updateClipPathAbove: (selection, done) => {
        return selection.select('clip-above')
          .attr('d', area.y0(0))
          .call(done);
      },

      clipPathAbove: (selection, done) => {
        if (start) {
          return selection.append('clipPath')
              .attr('id', 'clip-above')
            .append('path')
              .attr('d', area.y0(0))
              .call(done);
        }

        return selection.call(done);
      },

      // three
      updateAreaAbove: (selection, done) => {
        return selection.select('.areaabove')
            .attr({
              'clip-path': 'url(#clip-above)',
              'd': area.y0((data) => y(data['San Francisco']))
            })
          .call(done);
      },

      areaAbove: (selection, done) => {
        if (start) {
          return selection.append('path')
            .attr({
              'class': 'areaabove',
              'clip-path': 'url(#clip-above)',
              'd': area.y0((data) => y(data['San Francisco']))
            })
            .call(done);
        }

        return selection.call(done);
      },

      // four
      updateAreaBelow: (selection, done) => {
        return selection.select('.areabelow')
            .attr({
              'clip-path': 'url(#clip-below)',
              'd': (d) => area(d)
            })
          .call(done);
      },

      areaBelow: (selection, done) => {
        if (start) {
          return selection.append('path')
            .attr({
              'class': 'areabelow',
              'clip-path': 'url(#clip-below)',
              'd': (d) => area(d)
            })
            .call(done);
        }

        return selection.call(done);
      },

      // five
      updateLine: (selection, done) => {
        return selection.select('line')
            .attr({
              'd': (d) => line(d)
            })
          .call(done);
      },

      line: (selection, done) => {
        if (start) {
          start = false;
          return selection.append('path')
            .attr({
              'class': 'line',
              'd': (d) => line(d)
            })
            .call(done);
        }

        return selection.call(done);
      }
    }
  });

  xAx(svg, {SIZE, xAxis});

  yAx(svg, {yAxis});

  load('diff', diffChart)
}

export {graph};
