import {expect} from 'chai';
import dimensions from './dimensions';
import {baseDimensions} from './loadVars.pretest';

describe('grizzy.dimensions', () => {
  const allDimensions = dimensions(baseDimensions);

  it('dimensions should return an object', () => {
    expect(typeof allDimensions === 'object').to.be.true;
  });

  it('height should equal 533px', () => {
    expect(allDimensions.width).to.equal(533);
  });

  it('width should equal 400px', () => {
    expect(allDimensions.height).to.equal(400);
  });
  it('width should equal 400px', () => {
    expect(dimensions({width:533, height:400}))
      .to.eql({
        margin: {
          top: 0, right: 0, bottom: 0, left: 0
        },
        width: 533, 
        height: 400
      });
  });

});