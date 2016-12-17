import {expect} from 'chai';
import blankSVG from './blankSVG';
import {baseDimensions} from './loadVars.pretest';
import d3 from 'd3';

const svg = blankSVG(d3, baseDimensions);

describe('grizzy.blankSVG', () => {
  var el;
  
  before(function(done) {
    el = document.createElement('div');
    el.id = 'test';
    done(); 
  });

  it('type is an d3 selected object object', () => {
    expect(typeof svg === 'object').to.be.true;
  });
  
  it('Should be translated', () => {
    expect(svg.attr('transform')).to.equal('translate(67,20)');
  });

  it('Should select existing DOM element', () => {
    var testId = blankSVG(d3, baseDimensions, el);
    expect(typeof testId === 'object').to.be.true;
  });
});
