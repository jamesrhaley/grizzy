
/**
* pick -> shorthand for document.querySelector(selector)
*/
const pick = (selector) => document.querySelector(selector);

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
function indexed(indices, collection, getProperty) {
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
class Queue {
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
function inArray(str, arr) {
  for (var i = 0; i < arr.length; i++){
    let word = arr[i]
    if (str.toLowerCase() === word.toLowerCase()) {
      return true
    }  
  }
}

function isEmpty(obj){
  return Object.keys(obj).length === 0 ||
    obj.length === 0;
}

module.exports = {indexed, Queue, inArray, isEmpty,pick};