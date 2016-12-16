import {expect} from 'chai';
import blankSVG from './blankSVG';
import {baseDimensions} from './loadVars.pretest';
import d3 from 'd3';

const svg = blankSVG(d3, baseDimensions);

describe('grizzy.blankSVG', function () {
  var el;
  
  before(function(done) {
    el = document.createElement('div');
    el.id = 'test';
    done(); 
  });

  it('type is an d3 selected object object', function () {
    expect(typeof svg === 'object').to.be.true;
  });
  
  it('Should be translated', function() {
    expect(svg.attr('transform')).to.equal('translate(67,20)');
  });

  it('Should select existing DOM element', function() {
    var testId = blankSVG(d3, baseDimensions, el);
    expect(typeof testId === 'object').to.be.true;
  });
});
