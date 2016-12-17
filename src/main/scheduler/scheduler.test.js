import { expect } from 'chai';
import { drawSchedule, load } from './scheduler';
import {
  svgParent,
  size,
  x,
  y,
  xAxis,
  testData
} from '../loadVars.pretest';

const svg = svgParent();

function bar(parent, data, helpers) {
  let size = helpers.size;
  let x = helpers.x;
  let y = helpers.y;
  return drawSchedule('.bar', parent, {
    data: data,
    is:{
      enter: (selection, done) => {
        return selection.enter().append('rect')
          .attr({
            'class': 'bar',
            'x': (d) => x(d.letter),
            'width': x.rangeBand(),
            'y': () => 0,
            'height': (d) => size.height - y(d.frequency)
          })
          .style({
            'opacity': 0
          })
          .transition().delay(100)
          .attr({
            'y': (d) => y(d.frequency)
          })
          .style({
            'opacity': 1
          })
          .call(done);

      }
    }
  });
}

let start = true;

function xAx(parent, helpers) {
  let xAxis = helpers.xAxis;
  let height = helpers.size.height;

  return drawSchedule('x axis', parent, {
    data: false,
    is:{
      enter: (selection, done) => {
        let axis = selection;

        if (start) {
          start = false;

          axis.append('g')
            .attr({
              'class': 'x axis',
              'transform': 'translate(0,' + height + ')'
            })
            .style({
              'opacity': 0
            })
            .transition().delay(100)
            .style({
              'opacity': 1
            })
            .call(xAxis);
        }

        return axis.call(done);
      }
    }
  });
}

describe('drawSchedule', () => {
  let schdeduleObject, type, dataBinder, is, keys, len;

  before(function (done) {
    schdeduleObject = bar(svg, testData, {size, x, y});
    type = schdeduleObject.type;
    dataBinder = schdeduleObject.dataBinder;
    is = schdeduleObject.is;
    keys = schdeduleObject.keys;
    len = schdeduleObject.len;

    done();
  });

  it('Should be an object', () => {
    expect(typeof schdeduleObject === 'object').to.be.true;
  });

  it('Should have a type', () => {
    expect(type).to.equal('pre-bind');
  });

  it('Should have a data binding function', () => {
    expect(typeof dataBinder === 'function').to.be.true;
  });

  it('Should have a is to describe what it will be', () => {
    expect(typeof is === 'object').to.be.true;
  });

  it('Should have keys', () => {
    expect(keys).to.eql(['enter']);
  });

  it('Should have length', () => {
    expect(len).to.equal(1);
  });

  it('A D3 element created by another party can be selected by setting data=false', () => {
    expect(xAx(svg, {xAxis, size})).to.exist;
  });

});

describe('load', () => {
  let loaded;

  before(function (done) {

    loaded = load(
      bar(svg, testData, {size,x,y}),
      xAx(svg, {size, xAxis})
    );

    // needed this time to complete the async call
    setTimeout(() => done(), 1000);
  });

  it('Should have length', () => {
    console.log(loaded);
  });
});