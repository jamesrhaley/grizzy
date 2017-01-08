'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _intent = require('./intent');

var _scheduler_globals = require('./scheduler_globals');

// views are in this case where the side effects are.  This is where
// d3 either is binding data to the DOM or rendering updates

// binds data to the dom if any and returns the parent object
// to apply transitions on.
function dataView(state) {
  var binders = state.dataBinder;
  var parent = [];

  for (var i = 0; i < binders.length; i++) {
    var bound = binders.shift();
    parent.push(bound());
  }

  _intent.scheduleSubject.onNext({
    type: _scheduler_globals.RENDER,
    stage: _scheduler_globals.PRE_RENDER,
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
      _intent.scheduleSubject.onNext({
        type: _scheduler_globals.RENDER,
        stage: _scheduler_globals.CALL_NEXT,
        returnCount: 1,
        time: time
      });
    };

    if (transition.namespace === undefined || transition.empty()) {
      return next();
    }

    transition.each(function () {
      return ++n;
    }).each('end', function () {
      if (! --n) {
        next();
      }
    });
  };
}

// render function renders a view or if pushes onNext to
// loadSubject if there is none to render
function renderView(state) {
  if (state.callIndex < state.len && state.parent !== undefined) {
    var stack = state.packed;
    stack.forEach(function (stage) {
      var parent = stage.parent,
          transition = stage.transition;

      // the transition contains the onNext to move
      // the transition forward uses scheduleSubject like 
      // dataView

      for (var i = 0; i < transition.length; i++) {
        var callNextWithTime = callNext(stage.time);
        var trans = transition.shift();
        parent[i].call(trans, callNextWithTime);
      }
    });
  } else {
    _intent.loadSubject.onNext({ type: _scheduler_globals.FINISH, time: state.time });
  }
}

// this step distinguishes it is a data binding step out to process
// or a rendering step
function views(state) {
  var type = state !== undefined ? state.type : undefined;

  if (type === _scheduler_globals.BIND && state.dataBinder.length > 0) {
    dataView(state);
  } else if (type === _scheduler_globals.RENDER) {
    renderView(state);
  } else {
    // error should be passed to rxjs
    var str = 'view in view.js is receiving an undefied object fix this';
    var err = new Error(str);
    throw err;
  }
}

exports.default = views;