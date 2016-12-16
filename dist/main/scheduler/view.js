'use strict';

var _require = require('./intent');

var queueSubject = _require.queueSubject;
var scheduleSubject = _require.scheduleSubject;

var _require2 = require('./scheduler_globals');

var BIND = _require2.BIND;
var RENDER = _require2.RENDER;
var FINISH = _require2.FINISH;
var PRE_RENDER = _require2.PRE_RENDER;
var CALL_NEXT = _require2.CALL_NEXT;

// views are in this case where the side effects are.  This is where
// d3 either is binding data to the DOM or rendering updates

// binds data to the dom if any and returns the parent object
// to apply transitions on.

function dataView(state) {
  var binders = state.dataBinder;
  var len = binders.length;
  var parent = [];

  for (var i = 0; i < len; i++) {
    var bound = binders.shift();
    parent.push(bound());
  }

  scheduleSubject.onNext({
    type: RENDER,
    stage: PRE_RENDER,
    parent: parent,
    time: state.time
  });
}

/**
* callNext -> passed to a d3 transision through 
* d3.(select).call pushes a value to scheduleSubject
* specific to d3
* onNext
*/
function callNext(time) {
  return function (transition) {
    var n = 0;
    var next = function next() {
      scheduleSubject.onNext({
        type: RENDER,
        stage: CALL_NEXT,
        returnCount: 1,
        time: time
      });
    };

    if (transition.namespace === undefined || transition.empty()) {
      return next();
    }

    transition.each(function () {
      return ++n;
    }).each("end", function () {
      if (! --n) {
        next();
      }
    });
  };
}

// render function renders a view or if pushes onNext to
// queueSubject if there is none to render
function renderView(state) {
  if (state.callIndex < state.len && state.parent !== undefined) {
    var stack = state.packed;
    stack.forEach(function (stage) {
      var parent = stage.parent;
      var transitions = stage.transition;
      var len = transitions.length;

      // the transition contains the onNext to move
      // the transition forward uses scheduleSubject like 
      // dataView
      for (var i = 0; i < len; i++) {
        var callNextWithTime = callNext(stage.time);
        var trans = transitions.shift();
        parent[i].call(trans, callNextWithTime);
      }
    });
  } else {
    queueSubject.onNext({ type: FINISH, time: state.time });
  }
}

// this step distinguishes it is a data binding step out to process
// or a rendering step
function views(state) {
  var type = state !== undefined ? state.type : 'done';

  if (type === BIND && state.dataBinder.length > 0) {
    dataView(state);
  } else if (type === RENDER) {
    renderView(state);
  } else {
    return false;
  }
}

module.exports = { views: views };