import moduleKeys from './moduleKeys';
import isPlainObject from 'lodash/isPlainObject';
import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';

const { BIND, PRE, RENDER, TYPE } = moduleKeys();

const isPre = (test) => isPlainObject(test) 
  ? test.type === PRE 
  : false;

const allBut = (value, str) => value !== str;

const is = (value, str) => value === str;

const baseAllCheck = (fn) => {
  return (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (!fn(arr[i])) {
        return false;
      }
    }
    return true;
  };
};

/** loop an array and see if all instance are Functions */
const isAllFunctions = baseAllCheck(isFunction);

//const isAllPlainObject = baseAllCheck(isPlainObject);

/**
 * object is nested two level deep. turns all into single obects
 * and flattens into a single array
 * @private
 * @param {Object} data - an object created by drawShedule
 */
function fromDrawObject(data) {
  return Object.keys(data)
    .filter( key => allBut( key, TYPE ))
    .map( key => {
      let innerObject = data[key];

      return Object.keys( innerObject )
        .map(innerKey => {

          return {
            type: is(key, BIND) ? BIND : RENDER,
            value: [innerObject[ innerKey ]]
          };              
        });

    }).reduce((a, b) => a.concat(b) );
}

function formCollection(data) {
  if ( isPre(data) ) {

    return fromDrawObject(data);

  } else if ( isArray(data) && isAllFunctions(data) ) {
    
    return [
      {
        type: RENDER,
        value: data
      }
    ];
  }
}
/**
 * preprocess:
 *  turn drawSchedule obects into something that be used by
 *  SchQ
 *
 * for esdoc
 * @ignore
 * @param {Array} allStages - an Array of mixed object to be converted
 *   to objects each with a properties of type and calls
 */
export default function preprocess(allStages) {

  return allStages
    .map(stage => formCollection(stage) )
    .reduce((a, b) => a.concat(b) );
}