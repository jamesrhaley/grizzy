import { Rx } from 'rx';
import drip from './drip'
import model from './model';
import graph from './mainD3';


const callAndCancel = drip.callAndCancel;
const parseDate = d3.time.format("%Y%m%d").parse;
const FILE = 'data.tsv';

drip.addMethodTo(Rx);

const setDrip = callAndCancel(
	(data, i) => {
		let pack = [];
		let j = -1;
		// while (++j <= i){
		// 	pack.push(data.cities[j])
		// }
		return Object.assign({}, data, {
			cities :[data.cities[i]], 
			cityLabels:[data.cityLabels[i]]});
	},3);

function loadData(file) {
	return Rx.Observable.create(observer => {
      d3.tsv(file, data => observer.next(data));
	  })
		.map(data =>  {
			data.forEach(d => {
		    d.date = parseDate(d.date);
		  });
		  
			return data;
		});
}

loadData(FILE)
	.map(model)
	.drip(setDrip, 3000)
	.subscribe(graph);
