import {transitionOrder} from '../../src/js/scheduler/combine/main';

describe('simple case', () => {
	let starter, obj1, obj2, obj3, obj4;

	beforeEach(function() {
		starter = {starter:0, enter:1};
		obj1 = {update:0, enter:1, exit:2};
		obj2 = {enter:0, exit:1};
		obj3 = {update:0, enter:1, tweek:2, exit:3};
		obj4 = {enter:0, exit:1, final:2};
	});

  it('first', () => {
    expect(transitionOrder(starter, obj1, obj2, obj3))
    	.toEqual([ 'starter', 'update', 'enter', 'tweek', 'exit' ]);
  });

  it('second', () => {
    expect(transitionOrder(starter, obj1, obj3, obj2))
    	.toEqual([ 'starter', 'update', 'enter', 'tweek', 'exit' ]);
  });

  it('third', () => {
    expect(transitionOrder(starter, obj3, obj1, obj2))
    	.toEqual([ 'starter', 'update', 'enter', 'tweek', 'exit' ]);
  });

  it('fourth', () => {
    expect(transitionOrder(starter, obj1, obj2, obj3, obj4))
    	.toEqual([ 'starter', 'update', 'enter', 'tweek', 'exit', 'final' ]);
  });

});