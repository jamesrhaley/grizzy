"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.isEmpty = isEmpty;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* pick -> shorthand for document.querySelector(selector)
*/
//export const pick = (selector) => document.querySelector(selector);

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
// export function indexed(indices, collection, getProperty) {
//   let request = new Array(indices.length);

//   if (arguments.length === 2){
//       indices.forEach( (collectionIndex, i) => {
//         request[i] = collection[collectionIndex];
//       });

//   } else {
//       indices.forEach( (collectionIndex, i) => {
//         request[i] = getProperty(collection[collectionIndex]);
//       });
//   }

//   return request;
// };

/**
* Queue -> very very basic queue
* @ignore
*/
var Queue = exports.Queue = function () {
  function Queue() {
    _classCallCheck(this, Queue);

    this.__queue__ = new Array();
    this.length = this.__queue__.length;
  }

  _createClass(Queue, [{
    key: "setLength",
    value: function setLength() {
      this.length = this.__queue__.length;
    }
  }, {
    key: "dequeue",
    value: function dequeue() {
      var value = this.__queue__.shift();
      this.setLength();
      return value;
    }
  }, {
    key: "enqueue",
    value: function enqueue(x) {
      this.__queue__.push(x);
      this.setLength();
    }
  }]);

  return Queue;
}();

// check if string is in the selected array
// export function inArray(str, arr) {
//   for (var i = 0; i < arr.length; i++){
//     let word = arr[i]
//     if (str.toLowerCase() === word.toLowerCase()) {
//       return true
//     }  
//   }
// }

/**
* @ignore
*/


function isEmpty(obj) {
  return Object.keys(obj).length === 0 || obj.length === 0;
}