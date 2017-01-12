import { Rx } from 'rx';
import { graph } from './mainD3';

function loadData(file, d3Loader) {
  return Rx.Observable.create(observer => {
    d3Loader(file, (error, data) => {
      if (error) {
        observer.onError(error);
      }
      observer.onNext(data);
      observer.onCompleted();
    });
  });
}

const checkBox = document.querySelector("input")
const label = document.getElementById("checkbox-text")

const checked = Rx.Observable
  .fromEvent(checkBox,'change')
  .map(evt=>evt.target.checked);

const timedChecked = Rx.Observable.of(true)
  .delay(2500)
  // clear timeout if checked event happens
  .takeUntil(checked);

const trueOrFalse = Rx.Observable
  .merge(checked, timedChecked)
  .startWith(false)

const createState = loadData('data.tsv', d3.tsv)
  .map( eachRow =>
    trueOrFalse.map( evt => 
      ({
        evt : evt,
        data: eachRow
          .map(d => 
            Object.assign({}, d, { frequency: +d.frequency })
          )
      })
    )
  )
  .concatAll();

// side effects-------------------------------------
//--------------------------------------------------
// update the dom in the one case that I need to
timedChecked
  .subscribe(truth =>{
    checkBox.checked = truth;
  })

createState  
  .subscribe(state => {
    
    graph(state)

  });

