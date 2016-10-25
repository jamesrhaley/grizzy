import { Rx } from 'rx';
import { graph } from './mainD3';

function loadData(file) {
	return Rx.Observable.create(observer => {
      d3.tsv(file, data => observer.next(data));
	  })
		.map(each => {
	    return each.map(d => {
	    	return {
	    		frequency: +d.frequency,
	    		letter: d.letter
	    	};
	    })
		})
}

const FILE = 'data.tsv';

loadData(FILE)
	.subscribe(state => graph(state));

