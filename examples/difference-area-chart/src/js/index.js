import { Rx } from 'rx';
import { graph } from './mainD3';

var parseDate = d3.time.format("%Y%m%d").parse;

function loadData(file) {
	return Rx.Observable.create(observer => {
      d3.tsv(file, data => observer.next(data));
	  })
		.map(data =>  {
			data.forEach(d => {
		    d.date = parseDate(d.date);
		    d["New York"]= +d["New York"];
		    d["San Francisco"] = +d["San Francisco"];
		  })
			return data;
		});
}

const FILE = 'data.tsv';

loadData(FILE)
	.subscribe(graph);

