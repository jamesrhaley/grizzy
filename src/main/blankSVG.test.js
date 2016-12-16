import {expect} from 'chai';
import blankSVG from './blankSVG';
import {baseDimensions} from './pretest';
import d3 from 'd3';

const svg = blankSVG(d3, baseDimensions);

describe('grizzy.blankSVG', function () {

  it('type is an d3 selected object object', function () {
    expect(typeof svg === 'object').to.be.true;
  });
  
  it('Should be translated', function() {
    expect(svg.attr('transform')).to.equal('translate(67,20)');
  });
});
