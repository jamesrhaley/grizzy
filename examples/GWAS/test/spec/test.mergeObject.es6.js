import {
	compile} 
from '../../src/js/scheduler/combine/main';

import {
	transitionOrder
} from '../../src/js/scheduler/combine/main';

describe('compile', () => {
	let keys = ['update', 'enter', 'exit']
	let suppliers = [
		{update:1, enter:2, exit:3},
		{update:4, enter:5, exit:6},
	];

	it('should return an object of arrays', function() {
		expect(compile(keys, suppliers)).toEqual({
			update:[1,4], enter:[2,5], exit:[3,6]
		});
	});
});