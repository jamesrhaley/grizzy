import {expect} from 'chai';
import graph from './dom/create-bar';
import loadData from './rx/load-data'
import Rx from 'rx';
const la = require('lazy-ass')
const is = require('check-more-types')

const FILE = 'data.tsv';

// tests for draw.test.js
function asyncTest(testValue) {
	describe('grizzy.draw', () => {
		it('should run async', () => {
			expect(true).to.be.true;
		})

		it('should be an array of 26 objects created by d3', () => {
			expect(testValue[0].length === 26).to.be.true;
		})
	});
}

function xTest(testfuc) {
	console.log(testfuc);
}
loadData(FILE)
	.subscribe(state => {
		let graphResults = graph(state, asyncTest);
		xTest(graphResults);
	});
