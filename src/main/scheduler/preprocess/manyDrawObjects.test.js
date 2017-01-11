import { expect } from 'chai';
import moduleKeys from './../moduleKeys';
import { byKeyOrder, manyDrawObjects } from './manyDrawObjects';

const { PRE, BIND, RENDER } = moduleKeys();

const mock = (x) => () => x;

const group1 = {
  type: PRE,
  bind: {mock:mock(1)},
  is : {
    enter: mock(1),
    update: mock(1)
  }
};

const group2 = {
  type: PRE,
  bind: {mock:mock(2)},
  is : {
    enter: mock(2),
    update: mock(2)
  }
};

const group3 = {
  type: PRE,
  bind: {mock:mock(2)},
  is : {
    broken: mock(2),
    update: mock(2)
  }
};

describe('byKeyOrder', function() {
  let arrayOfIs = byKeyOrder( [group1.is, group2.is] );

  it('should return an array of arrays with a length of 2', () => {
    expect( arrayOfIs.length ).to.equal( 2 );
  });

  it('the return of the objects should be [[1,2],[1,2]]', () => {
    const mappedValue = arrayOfIs.map(arr => 
      arr.map(obj => 
        obj.value()
      )
    );

    expect( mappedValue ).to.eql( [[1,2],[1,2]] );
  });

  it('should throw if second object cannot be matched with first', () =>  {
    expect( () => byKeyOrder( [group1.is, group3.is] ) )
      .to.throw(/drawShedule Objects in arrays must follow the pattern/);
  });

});

describe('manyDrawObjects', function() {
/**
 * what object should look like
 * let shouldBe = [
 *   [
 *     {
 *       type: BIND,
 *       value: mock(1)
 *     },
 *     {
 *       type: BIND,
 *       value: mock(2)
 *     }
 *   ],
 *   [
 *     {
 *       type: RENDER,
 *       value: mock(1)
 *     },
 *     {
 *       type: RENDER,
 *       value: mock(2)
 *     }
 *   ],
 *   [
 *     {
 *       type: RENDER,
 *       value: mock(1)
 *     },
 *     {
 *       type: RENDER,
 *       value: mock(2)
 *     }
 *   ]
 * ];
 */
  let many = manyDrawObjects([group1, group2]);

  it('should be length of 3', function() {
    expect( many.length === 3).to.be.true;
  });

  it('stringTypes should be right', function() {
    expect( many[0][0].type === BIND ).to.be.true;
    expect( many[0][1].type === BIND ).to.be.true;
    expect( many[1][0].type === RENDER ).to.be.true;
    expect( many[1][1].type === RENDER ).to.be.true;
    expect( many[2][0].type === RENDER ).to.be.true;
    expect( many[2][1].type === RENDER ).to.be.true;
  });

  it('the return of the objects should be [[1,2],[1,2], [1,2]]', () => {
    const mappedValue = many.map(arr => 
      arr.map(obj => 
        obj.value()
      )
    );

    expect( mappedValue ).to.eql( [[1,2],[1,2], [1,2]] );
  });
});