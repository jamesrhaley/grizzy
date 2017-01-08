'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transitionState = undefined;
exports.dataModel = dataModel;

var _scheduler_globals = require('./scheduler_globals');

// state is held in this object
// While javascript is dynamic, most implementations prefer
// being explicit
var transitionState = exports.transitionState = {
  packed: [],
  dataBinder: [],
  parent: [],
  keys: [], // don't need
  is: {},
  len: 0, // don't need
  flag: false, // don't need
  time: undefined, // don't need
  callIndex: -1, // don't need
  type: 'base',
  stage: '', // only need a type or a stage
  out: undefined // don't need
};

// helper function to report how many transition
// are out to be renders
function checkOut(obj) {
  return obj !== undefined ? obj.length : 0;
}

function packDataBind(state, update) {
  var dataBinder = update.dataBinder,
      create = update.create,
      keys = update.keys,
      is = update.is,
      len = update.len,
      time = update.time;


  var next = {
    packed: [],
    dataBinder: dataBinder,
    parent: create,
    keys: keys,
    is: is,
    len: len,
    flag: false,
    callIndex: -1,
    time: time,
    type: _scheduler_globals.BIND,
    stage: 'post-bind',
    out: 0
  };

  return next;
}

function packTransition(state, boundDOM) {
  var i = void 0,
      transition = void 0;

  // check if there are transition still out for process
  if (boundDOM.hasOwnProperty('returnCount')) {
    var countObjectsOut = state.out - boundDOM.returnCount;

    if (countObjectsOut > 0) {

      state = Object.assign({}, state, {
        out: countObjectsOut,
        flag: true
      });

      return state;
    }
  }

  //
  // when there are no outstanding transitions
  // get current transitions
  //
  i = state.callIndex += 1;
  transition = state.is[state.keys[i]];

  if (state.callIndex === 0) {

    return Object.assign({}, state, {
      packed: [{
        parent: boundDOM.parent,
        transition: transition,
        time: state.time
      }],
      parent: boundDOM.parent,
      out: checkOut(transition),
      stage: 'start',
      flag: false,
      type: _scheduler_globals.RENDER
    });
  } else if (state.callIndex < state.len) {

    return Object.assign({}, state, {
      packed: [{
        parent: state.parent,
        transition: transition,
        time: state.time
      }],
      stage: 'continue',
      out: checkOut(transition),
      flag: false,
      type: _scheduler_globals.RENDER
    });
  } else {
    return Object.assign({}, state, {
      packed: [],
      stage: 'empty',
      out: checkOut(transition),
      flag: false,
      type: _scheduler_globals.RENDER
    });
  }
}

function dataModel(state, update) {
  var type = update.type;

  if (type === _scheduler_globals.PRE_BIND) {
    return packDataBind(state, update);
  } else if (type === _scheduler_globals.RENDER) {
    return packTransition(state, update);
  } else {
    // error should be passed to rxjs
    var str = 'dataModel in model.js is receiving an undefied object fix this';
    var err = new Error(str);
    throw err;
  }
}