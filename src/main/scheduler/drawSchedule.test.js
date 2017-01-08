import { expect } from 'chai';
import { drawSchedule, load } from './drawSchedule';
import { drawComplete } from './pipeline';
import isPlainObject from 'lodash/isPlainObject';
import isFunction from 'lodash/isFunction';
import {
  svgParent,
  size,
  x,
  y,
  xAxis,
  testData
} from '../loadVars.pretest';

// DOM svg parent to bind data
// and create svgs
const svg = svgParent();

// example bar graph to test
function bar(parent, data, helpers) {
  let size = helpers.size;
  let x = helpers.x;
  let y = helpers.y;

  return drawSchedule('body', parent, {
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
// example x axis to test
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

function basicObject(parent, data) {
  return drawSchedule('.bar', parent, {
    data: [data, (d) => d.letter],
    is:{
      enter: (selection, done) => {
        return selection
          .call(done);

      }
    }
  });
}

describe('drawSchedule', () => {
  let schdeduleObject,
    renderSvgWithData,
    axis,
    axisParent,
    entireDrawSequenceCompletes;

  before(function (done) {
    
    schdeduleObject = bar(svg, testData, {size, x, y});

    renderSvgWithData = schdeduleObject.bind.dataBinder();
    
    axis = xAx(svg, {xAxis, size});
    
    axisParent = axis.bind.dataBinder();
    
    let loadTest = xAx(svg, {xAxis, size});
    let loadTest2 = bar(svg, testData, {size, x, y});
    
    // just make a load happen
    load('test', loadTest, loadTest2);

    drawComplete.subscribe(bool => {
      entireDrawSequenceCompletes = bool;
      done();
    });
  });

  it('Should return an Object', () => {
    expect( isPlainObject( schdeduleObject )).to.be.true;
  });

  it('The Object has a string type', () => {
    expect( schdeduleObject.type === 'pre' ).to.be.true;
  });

  it('Object has a property dataBinder which is a function', () => {
    expect( isFunction(schdeduleObject.bind.dataBinder) )
      .to.be.true;
  });

  it('Bind Function creates a proxy Array with a length of 2', () => {
    expect( renderSvgWithData[0].length === 2 ).to.be.true;
  });

  it('The Object has a property of is which is a Object', () => {
    expect( isPlainObject(schdeduleObject.is) ).to.be.true;
  });

  it('"is" in this case only has one key', () => {
    expect( Object.keys(schdeduleObject.is).length === 1 ).to.be.true;
  });

  it('D3 elements created without data bind. Parent reference passed with prop data=false', () => {
    expect( isPlainObject(axis) ).to.be.true;
  });

  it('Parent of axis is orgiginal DOM SVG', () => {
    expect( axisParent[0][0] === svg[0][0] ).to.be.true;
  });

  it('Should allow d3 data function to bin to the DOM with an id function', () => {
    expect( isPlainObject(basicObject(svg, testData)) ).to.be.true;
  });

  it('entire drawSchedule sequence completes from front to end', () => {
    expect( entireDrawSequenceCompletes ).to.be.true;
  });
});
