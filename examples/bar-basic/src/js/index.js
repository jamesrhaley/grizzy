import { Rx } from 'rx';
import { graph } from './mainD3';

function loadData(file, fileType) {
  return Rx.Observable.create(observer => {
    d3[fileType](file, data => observer.next(data));
  });
}

loadData('data.tsv', 'tsv')
  .map(each => 
    each.map(d => 
      ({
        frequency: +d.frequency,
        letter: d.letter
      })
    )
  )
  .subscribe(state => graph(state));

