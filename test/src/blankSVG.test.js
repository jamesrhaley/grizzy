import {expect} from 'chai';
import dimensions from '../../src/main/dimensions';
import blankSVG from '../../src/main/blankSVG';


describe('grizzy.blankSVG', function () {
  const baseDimensions = {
    width : 800,
    height : 500,
    margin:{top: 20, right: 200, bottom: 80, left: 67}
	};
	const allDimensions = dimensions(baseDimensions);
  var svg = blankSVG(d3, baseDimensions, '#app-test')

  it('type is an d3 selected object object', function () {
    expect(typeof svg === 'object').to.be.true;
  })

  it('type is an d3 selected object object', function () {
    expect(typeof svg === 'object').to.be.true;
  }) 
})