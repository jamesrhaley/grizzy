import { Rx } from 'rx';
import drip from './drip';
import model from './model';
import graph from './mainD3';

import {drawComplete} from 'grizzy';

const started = drawComplete
  .startWith(true);


drip.addMethodTo(Rx);

const callAndCancel = drip.callAndCancel;

const parseDate = d3.time.format("%Y%m%d").parse;
const FILE = 'data.tsv';

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

const dripState = (data, i) => {
  let packCities = [], packLables = [], j = -1;

  while (++j <= i){
    packCities.push(data.cities[j]);
    packLables.push(data.cityLabels[j]);
  }

  return Object.assign({}, data, {
    cities :packCities, 
    cityLabels:packLables
  });

};


loadData(FILE)
  .map(model)
  .drip(dripState, started)
  .take(3)
  .subscribe(graph);

