import {expect} from 'chai';
import dimensions from './dimensions';

describe('grizzy.dimensions', () => {
  const baseDimensions = {
    width : 800,
    height : 500,
    margin:{top: 20, right: 200, bottom: 80, left: 67}
  };
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
});