// © 2016 James Haley for licencing contact at james.r.haley@gmail.com
// var d3 = require('d3');
import { Rx } from 'rx';

d3.selection.prototype.do = function(callback) {
  if (!arguments.length){
    var group = this;
    callback.apply(undefined, group);
  }
  return this;
};

let d3_arraySlice = [].slice;
let d3_array = (list) => d3_arraySlice.call(list); 

d3.selection.prototype.call = function(callback) {

  var args = d3_array(arguments);
  // console.log('callback',callback, '\n', 'args[0]',args[0], 'this',this);
  // apply passes this which is the d3 object array and we 
  // replace the callback with this then call apply on remainder
  args[0] = this;
  callback.apply(args[0], args);
  return this;
};

d3.selection.prototype.nest = d3.selection.prototype.call;

export var d3local = d3;

/**
* indexed -> takes a list of indices and gets them from a 
*   collection
* @param{Array::Numbers} (indices) -> index list
* @param{Array::Arrays/Objects} (collection) -> collection to get 
*   values
* @param{Function} (getProperty) -> callback to get value from
*   collection
* @return{Array/Array::Objects/Array::Array}
*/
export function indexed(indices, collection, getProperty) {
  let request = new Array(indices.length);

  if (arguments.length === 2){
      indices.forEach( (collectionIndex, i) => {
        request[i] = collection[collectionIndex];
      });
      
  } else {
      indices.forEach( (collectionIndex, i) => {
        request[i] = getProperty(collection[collectionIndex]);
      });
  }

  return request;
};

/**
* Queue -> very very basic queue
*/
export class Queue {
  constructor() {
    this.__queue__ = new Array();
    this.length = this.__queue__.length;
  }
  
  setLength() {
    this.length = this.__queue__.length;
  }

  dequeue() {
    let value = this.__queue__.shift();
    this.setLength();
    return value;
  }

  enqueue(x) {
    this.__queue__.push(x);
    this.setLength();
  }
}

// check if string is in the selected array
export function inArray(str, arr) {
  for (var i = 0; i < arr.length; i++){
    let word = arr[i]
    if (str.toLowerCase() === word.toLowerCase()) {
      return true
    }  
  }
}

export function isEmpty(obj){
  return Object.keys(obj).length === 0 ||
    obj.length === 0;
}

export var sum = d3local.sum
export var min = d3local.min;
export var ascending = d3local.ascending;
export var d3nest = d3local.nest;

export var source = 'source';
export var target = 'target';


export const pick = (selector) => document.querySelector(selector);
