"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* pick -> shorthand for document.querySelector(selector)
*/
var pick = function pick(selector) {
  return document.querySelector(selector);
};

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
  var request = new Array(indices.length);

  if (arguments.length === 2) {
    indices.forEach(function (collectionIndex, i) {
      request[i] = collection[collectionIndex];
    });
  } else {
    indices.forEach(function (collectionIndex, i) {
      request[i] = getProperty(collection[collectionIndex]);
    });
  }

  return request;
};

/**
* Queue -> very very basic queue
*/

var Queue = function () {
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


function inArray(str, arr) {
  for (var i = 0; i < arr.length; i++) {
    var word = arr[i];
    if (str.toLowerCase() === word.toLowerCase()) {
      return true;
    }
  }
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0 || obj.length === 0;
}

module.exports = { indexed: indexed, Queue: Queue, inArray: inArray, isEmpty: isEmpty, pick: pick };