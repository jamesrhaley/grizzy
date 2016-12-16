'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Rx = require('rx');

var _require = require('../sharedResource');

var Queue = _require.Queue;
var isEmpty = _require.isEmpty;

var _require2 = require('./intent');

var queueSubject = _require2.queueSubject;
var scheduleSubject = _require2.scheduleSubject;

var _require3 = require('./model');

var transitionState = _require3.transitionState;
var dataModel = _require3.dataModel;

var _require4 = require('./view');

var views = _require4.views;

var _require5 = require('./scheduler_globals');

var LOAD = _require5.LOAD;
var PRE_BIND = _require5.PRE_BIND;
var FINISH = _require5.FINISH;


var masterTime = 0;

// filters out process that should be canceled if a user
// has updated the data of the application
var ignoreOld = function ignoreOld(x) {
  return x.time === masterTime;
};

var backFromRenderStream = scheduleSubject.filter(ignoreOld);

var stagedState = {
  staged: {},
  queue: new Queue(),
  time: 0
};

function queueModel(acc, curr) {
  if (curr.type === LOAD) {
    var _ret = function () {
      var Q = new Queue();

      masterTime = curr.time;

      curr.transitions.forEach(function (transition) {
        Q.enqueue(transition);
      });

      return {
        v: {
          staged: Q.dequeue(),
          queue: Q,
          time: curr.time
        }
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } else if (curr.type === FINISH) {
    var _Q = acc.queue;

    if (_Q.length > 0) {
      return {
        staged: _Q.dequeue(),
        queue: _Q,
        time: acc.time
      };
    } else {
      return stagedState;
    }
  }
}

// this will also have a step to call for another 
// dequeued item when all transitions are done
// for clarity startWith is used with a templete of
// what the model is.  Skip prevents that empty model
// from being streamed to the next stage.
var queueStream = queueSubject.startWith(stagedState).scan(queueModel).skip(1).filter(function (obj) {
  return !isEmpty(obj.staged);
});

// shape object if it is a plain object
var singleStream = queueStream.filter(function (staged) {
  return !Array.isArray(staged);
}).map(function (preTransition) {
  var pre = preTransition.staged;
  var transitions = pre.is;
  var keys = Object.keys(transitions);
  var is = {};

  keys.forEach(function (key) {
    is[key] = [transitions[key]];
  });

  var post = Object.assign({}, pre, {
    time: preTransition.time,
    dataBinder: [pre.dataBinder],
    is: is
  });

  return post;
});

var mergeSubject = Rx.Observable.merge(singleStream, backFromRenderStream);

mergeSubject.startWith(transitionState).scan(dataModel).skip(1)
// if transitions are still out, filter stops
// state from returning
.filter(function (state) {
  return !state.flag;
}).subscribe(function (transitionStage) {
  views(transitionStage);
});

module.exports = { queueSubject: queueSubject };