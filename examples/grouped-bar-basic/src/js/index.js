import { Rx } from 'rx';
import { graph } from './mainD3';
import bumpLayer from './bumpLayer'

// seperate state from view
const rows = 4;
const collumns = 58;
const color = d3.scale.linear()
    .domain([0, rows - 1])
    .range(["#aad", "#556"]);

const stack = d3.layout.stack();

const dataStream = Rx.Observable.of({
    rows,
    collumns,
    groups: d3.range(rows)
      .map((_, rowCount) => bumpLayer(collumns, .1, {color, rowCount}))
  })
  // get values that deal with the graph
  .map(state => {
    let groups = stack(state.groups);

    let yGroupMax = d3.max(
      groups, 
      (group) => d3.max(group, (d) => d.y)
    );
    
    let yStackMax = d3.max(
      groups,
      (group) => d3.max(group, (d) => d.y0 + d.y)
    );

    return Object.assign({}, state, {
      groups,
      yGroupMax,
      yStackMax
    })
  })



const grouped = document.getElementById("grouped");
const stacked = document.getElementById("stacked");

const checkedGroup = Rx.Observable.fromEvent(grouped,'change')
const checkedStack = Rx.Observable.fromEvent(stacked,'change')

const checkedStream = checkedGroup.merge(checkedStack)
  .map(evt=>({type:evt.target.id}))


const timedChecked = Rx.Observable.of({type:'grouped'})
  .delay(2500)
  // clear timeout if checked event happens
  .takeUntil(checkedStream);


const stackedOrGrouped = Rx.Observable
  .merge(checkedStream, timedChecked)
  .startWith({type:'stacked'})


const program = Rx.Observable.combineLatest(
  stackedOrGrouped,
  dataStream,
  (type, data) => ({type, data})
);

timedChecked
  .subscribe(truth =>{
    grouped.checked = true;
    stacked.checked = false
  })

program
  .subscribe(state => {
    let {type, data} = state;
    graph(type, data);
  });

