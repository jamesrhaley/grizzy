'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadSubject = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _sharedResource = require('../sharedResource');

var _intent = require('./intent');

var _model = require('./model');

var _view = require('./view');

var _view2 = _interopRequireDefault(_view);

var _scheduler_globals = require('./scheduler_globals');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var masterTime = 0;

// filters out process that should be canceled if a user
// has updated the data of the application
var ignoreOld = function ignoreOld(x) {
  return x.time === masterTime;
};

var backFromRenderStream = _intent.scheduleSubject.filter(ignoreOld);

var stagedState = {
  staged: {},
  queue: new _sharedResource.Queue(),
  time: 0
};

function queueModel(acc, curr) {
  if (curr.type === _scheduler_globals.LOAD) {
    var _ret = function () {
      var Q = new _sharedResource.Queue();

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
  } else if (curr.type === _scheduler_globals.FINISH) {
    var Q = acc.queue;

    if (Q.length > 0) {
      return {
        staged: Q.dequeue(),
        queue: Q,
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
var queueStream = _intent.loadSubject.startWith(stagedState).scan(queueModel).skip(1).filter(function (obj) {
  return !(0, _sharedResource.isEmpty)(obj.staged);
});

// shape object if it is a plain object
var queuedStream = queueStream.filter(function (staged) {
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

var mergeSubject = _rx2.default.Observable.merge(queuedStream, backFromRenderStream);

mergeSubject.startWith(_model.transitionState).scan(_model.dataModel).skip(1)
// if transitions are still out, filter stops
// state from returning
.filter(function (state) {
  return !state.flag;
}).subscribe(function (transitionStage) {
  (0, _view2.default)(transitionStage);
});

exports.loadSubject = _intent.loadSubject;