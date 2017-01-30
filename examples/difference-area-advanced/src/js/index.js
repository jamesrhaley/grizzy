import { Rx } from 'rx';
import drip from './drip';
import { graph } from './mainD3';

import {drawComplete} from 'grizzy';

drip.addMethodTo(Rx);

const stateCompleted = drawComplete
  .startWith(true);


var parseDate = d3.time.format("%Y%m%d").parse;

function loadData(file) {
	return Rx.Observable.create(observer => {
      d3.tsv(file, data => observer.next(data));
	  })
		.map(data =>  {
			data.forEach(d => {
		    d.date = parseDate(d.date);
		    d["New York"] = +d["New York"];
		    d["San Francisco"] = +d["San Francisco"];
		  })
			return data;
		});
}

const FILE = 'data.tsv';

// remember to return undefined when drip state finishes
//
const dripState = (data, i) => {
	let {leader, follower} = data;

	while (i <= leader.length) {
		leader.forEach((item, index) => {
			if (index >= i) {
				follower[index]["San Francisco"] = item["New York"]
			} else {
				follower[index]["San Francisco"] = item["San Francisco"]
			}
		});

		return follower;
	}

	return undefined;
};


loadData(FILE)
	.map(data => ({
		// fixed copy
		leader: data,
		// for quick mutable data
		follower: data.map(item => Object.assign({},item))
	}))
	.drip(dripState, stateCompleted)
	.delay(16)
	.subscribe(state => graph(state));

