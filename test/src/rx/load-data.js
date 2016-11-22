
export default function loadData(file) {
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
		});
}