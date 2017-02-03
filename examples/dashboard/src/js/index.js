import { Rx } from 'rx';
import { dashboard } from './graph/mainD3';


const dropDown = document.getElementById("pulldown");

const drowpDownStream = Rx.Observable.fromEvent(dropDown, "change")
  .map((_) => document.getElementById("selected").value )
  .startWith('CA')


function loadData(file, fileType) {
  return Rx.Observable.create(observer => {
    d3[fileType](file, data => observer.next(data));
  });
}

loadData("data.csv", 'csv')
  .map(states => {
    const stateById = d3.map();
    const groups = Object.keys(states[0])
      .filter(d => d !== 'id' && d !== 'total');

    states.forEach((d) => {
      // Coerce population counts to numbers and compute total per state.
      d.total = d3.sum(groups, (k) => d[k] = +d[k]);
      stateById.set(d.id, d);
    });

    return stateById;
  })
  .combineLatest(drowpDownStream)
  .map((state) => ({
    id: state[1],
    data: state[0].get(state[1]),
    stateById: state[0]
  }))
  .subscribe(state => {
    let {id, data, stateById} = state;

    const allVals = Object.keys(data)
      .filter(d => d !== 'id' && d !== 'total');

    const groups = allVals.map(key => ({id:key,value:data[key]}));

    dashboard(data, groups, allVals, stateById);
  });




