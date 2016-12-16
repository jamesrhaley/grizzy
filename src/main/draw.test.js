import {expect} from 'chai';
import draw from './draw';
import dimensions from './dimensions';
import blankSVG from './blankSVG';
import d3 from 'd3';


const baseDimensions = {
  width : 800,
  height : 500,
  margin: {top: 20, right: 200, bottom: 80, left: 67}
};

const size = dimensions(baseDimensions);

const svg = blankSVG(d3, baseDimensions);

const x = d3.scale.ordinal()
  .rangeRoundBands([0, size.width], .1);

const y = d3.scale.linear()
  .range([size.height, 0]);

const testData = [
  {letter: 'A', frequency: 0.08167},
  {letter: 'B', frequency: 0.01492}
];

function bar(parent, data, helpers) {
  let size = helpers.size;
  let x = helpers.x;
  let y = helpers.y;

  return draw('.bar', parent, {
    data: data,
    is:{
      enter: (selection) => {
        return selection.enter().append('rect')
          .attr({
            'class': 'bar',
            'x': (d) => x(d.letter),
            'width': x.rangeBand(),
            'y': (d) => y(d.frequency),
            'height': (d) => size.height - y(d.frequency)
          });
      }
    }
  });
}

describe('grizzy.draw', () => {
  var graph, oneBar;

  before(function (done) {
    graph = bar(svg, testData, {size, x, y});
    oneBar = graph[0][0];

    done();
  });

  it('There should be 2 bars', () => {
    expect(graph[0].length === 2).to.be.true;
  });

  it('They should have a class of bar', () => {
    expect(oneBar.getAttribute('class'))
      .to.equal('bar');
  });

  it('A bar should have a height', () => {
    let height = oneBar.getAttribute('height');

    expect(parseFloat(height).toFixed(2))
      .to.equal('32.67');
  });

  it('A bar should have a width', () => {
    let width = oneBar.getAttribute('width');

    expect(width)
      .to.equal('4797');
  }); 
});
