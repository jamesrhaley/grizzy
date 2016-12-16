import {expect} from 'chai';
import blankSVG from './blankSVG';
import d3 from 'd3';


const baseDimensions = {
  width : 800,
  height : 500,
  margin: {top: 20, right: 200, bottom: 80, left: 67}
};

const svg = blankSVG(d3, baseDimensions);

describe('grizzy.blankSVG', function () {

  it('type is an d3 selected object object', function () {
    expect(typeof svg === 'object').to.be.true;
  });
  
  it('Should be translated', function() {
    expect(svg.attr('transform')).to.equal('translate(67,20)');
  });
});
