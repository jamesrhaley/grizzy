import React from 'react';
import Rx from 'rx';


const BASE_FILE = 'geneData.csv';

// const gatherResultsStream = new Rx.ReplaySubject(0);
const gatherIndexStream = new Rx.Subject();
const currentSetStream = new Rx.Subject();
// tracking data
// currentSetStream.subscribe(x=>console.log(x))

// use d3.csv to get the file and convert it to a usable
// array of objects
const request$ =  Rx.Observable.create(observer => {
  d3.csv(BASE_FILE, data => observer.next(data));
});

// helper to add indices to objects for the purpose of being
// able to find them later
const sizeFunc =(d) => {
  let rad = d*2;
  return rad <= 2 ? 2 : rad >= 22 ? 22 : rad;
};

let counter = 0

function newID() {
  return `id${++counter}`
}

function asNumber(x) {
  return isNaN(+x) ? 0 : +x;
}
function isReported(x) {
  return x.length !== 0 ? x : 'Not reported';
}

//max=10, min=2, smooth=1.05

function logistical(max, min, smooth) {
  let top = max-min;
  return (x) => {
    return (top / (1 + 100 * Math.pow(smooth, -x)) + min);
  }
}
const scurve = logistical(14, 3, 2.3)

const Observable = Rx.Observable

// capture chart

// var totalValue = 0;

// requst the data and format it
const allDataStream =  Observable.create(observer => {
    d3.csv(BASE_FILE, data => observer.next(data));
  })
  .map(each => {
    return each

    .map(d =>{
      return {
        DISEASE_TRAIT: d.DISEASE_TRAIT,
        PVALUE_MLOG: asNumber(d.PVALUE_MLOG),
        REGION: d.REGION,
        CHR_ID: d.CHR_ID,
        CHR_POS: d.CHR_POS,
        STUDY: d.STUDY,
        MAPPED_GENE: d.MAPPED_GENE,
        P_VALUE: +d.P_VALUE,
        SNPS: d.SNPS,
        MAPPED_TRAIT: d.MAPPED_TRAIT,
        MAPPED_TRAIT_URI: d.MAPPED_TRAIT_URI,
        SNP_ID_CURRENT: +d.SNP_ID_CURRENT,
        OR_or_BETA: +d.OR_or_BETA,
        CONTEXT: isReported(d.CONTEXT),
        LINK: d.LINK,
        ID: newID(),
        RADIUS: sizeFunc(+d.OR_or_BETA)
      }
    })
    // .filter(d=> +d.RADIUS > 2);
    // .filter(d=> +d.P_VALUE < );
  })

// capture the values from the async request after the
// request is processed.
var claim;
allDataStream.subscribe(x=>claim = x);

function filterChoice(dataArray, choiceArray) {
  // get just the strings of the users choices
  let pickedData = [];
  let allChoices = [];
  
  choiceArray.forEach(choice => {
    allChoices.push(choice.text)
  });

  
  allChoices.forEach(str => {
    let gathered = dataArray.filter(obj => {
      let testString = str.toLowerCase();

      return testString === obj.DISEASE_TRAIT.toLowerCase() 
        ||  testString === obj.MAPPED_TRAIT.toLowerCase();
    });

    pickedData = pickedData.concat(gathered)
  })
  return pickedData;
}

const filterStream = Rx.Observable.combineLatest(
  allDataStream, currentSetStream.startWith([])
)
  // .do(x=>console.log(x))
  .filter(both => both[1] !== [])
  .map(values => {
    let orginalData = values[0];
    let selectedString = values[1];

    return filterChoice(orginalData, selectedString)
  })

export {gatherIndexStream, currentSetStream, allDataStream, filterStream};
