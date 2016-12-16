import {expect} from 'chai';
import draw from './draw';
import {
  svgParent,
  size,
  x,
  y,
  xAxis
} from './loadVars.pretest';
import d3 from 'd3';

const svg = svgParent();

const testData = [
  {letter: 'A', frequency: 0.08167},
  {letter: 'B', frequency: 0.01492}
];

function bar(parent, data, helpers) {
  let {size, x, y} = helpers;

  return draw('.bar', parent, {
    data: [data, (d) => d.letter],
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

function xAx(parent, helpers){
  let {xAxis, size} = helpers;
  let height = size.height;

  return draw('x axis', parent, {
    data: false,
    is:{
      enter: (selection)=> {
        return selection.append('g')
          .attr({
            'class': 'x axis',
            'transform': 'translate(0,' + height + ')'
          })
          .call(xAxis);
      }
    }
  });
}

describe('grizzy.draw', () => {
  var graph, oneBar, axis;

  before(function (done) {
    graph = bar(svg, testData, {size, x, y});
    oneBar = graph[0][0];
    axis = xAx(svg, {size, xAxis});

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

  it('A D3 element created by another party can be selected by setting data=false', () => {
    
    expect(d3.select('.x.axis').attr('transform'))
      .to.equal('translate(0,400)');

    expect(d3.select('.x.axis')
      .attr('class')).to.equal('x axis');
  });
});
