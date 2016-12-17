import {gatherIndexStream, allDataStream} from '../../mainStream';


const LENGTH_OF_DATA = 15;
// currently hackish could be better but this varible holds the data
// once it is retrived
var asyncData;
allDataStream.subscribe(x=>asyncData = x);

// cature each individual trait and its name and original index
// in the orginal data set
function traitMap(data, key, kind) {
  let traits = {};

  data.forEach((row, i) => {
    let value = row[key].toLowerCase()

    if (!traits.hasOwnProperty(value)) {
      traits[value] = {indexlist: [], kind: kind, name: row[key]}
    }
    traits[value].indexlist.push(row.INDEX)
  });
  return traits;
}

// remove duplicate indies
function mergeArray(arr1, arr2){
  arr1.forEach(index =>{
    if(!index in arr2) {
      arr2.push(index)
    }
  });
  return arr2;
}

// meger two maps, combined there index arrays,
// and update their kind if there is overlap
function mergeMaps(mainMap, merger) {
  let mergeCheck = Object.keys(merger);

  mergeCheck.forEach((key,i) => {
    if (mainMap.hasOwnProperty(key)) {
      let mergedKind = mainMap[key].kind + " & " + merger[key].kind;
      
      let indexArray = mergeArray(
        mainMap[key].indexlist,
        merger[key].indexlist
      );

      mainMap[key] = {
        indexlist:indexArray,
        kind: mergedKind,
        name: mainMap[key].name
      }
    }

    else {
      mainMap[key] = merger[key]
    }
  });
  return mainMap;
};

// turn data back into a usable array to itterate over
function searchSet(data) {
  let values = Object.keys(data)
  let traits = new Array(values.length);

  values.forEach((value, i) => {
    traits[i] = {
      key: value,
      indexlist: data[value].indexlist, 
      kind : data[value].kind,
      name : data[value].name
    };
  })
  return traits;
}

// https://developer.mozilla.org/en/docs/Web/
// JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// gathers a limited list of suggestions by removing duplicates
function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  const data = asyncData.filter(asyncData => {
    return regex.test(asyncData.DISEASE_TRAIT || asyncData.MAPPED_TRAIT)
  });
  // this adds my requirements into the fold
  let mappedD = traitMap(data, 'DISEASE_TRAIT', 'disease trait');
  let mappedM = traitMap(data, 'MAPPED_TRAIT', 'mapped trait');
  let merged = mergeMaps(mappedD, mappedM)
  let setOfdata = searchSet(merged);
  let shrotenedData = setOfdata.slice(0,LENGTH_OF_DATA)

  // push data to commuication layer... not pure should find another solution
  // to clean this up
  gatherIndexStream.onNext(shrotenedData);
  
  return shrotenedData;
}



export {getSuggestions};