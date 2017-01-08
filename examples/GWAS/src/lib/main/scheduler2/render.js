'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _globalKeys = require('./globalKeys');

// views are in this case where the side effects are.  This is where
// d3 either is binding data to the DOM or rendering updates

// binds data to the dom if any and returns the parent object
// to apply transitions on.
function dataView(state) {
  var message = state.message,
      next = state.next,
      emitter = state.emitter;

  var binders = next.value;
  var key = message.key;
  var parent = binders.map(function (binder) {
    return binder();
  });

  // binders.forEach(binder => {
  //   parent.push(binder());
  // });

  var packet = {
    type: _globalKeys.BIND,
    parent: parent
  };
  console.log('data packet', packet);
  emitter.emit(key, packet);
}

function callNext(emitter, key, parent) {
  return function (transition) {
    var n = 0;
    var next = function next() {
      console.log('this happened', emitter.hasObserver(key));
      emitter.hasObserver(key);
      emitter.emit(key, {
        type: _globalKeys.RENDER,
        parent: parent
      });
    };

    if (transition.namespace === undefined || transition.empty()) {
      console.log('performed a none transition');
      return next();
    }

    transition.each(function () {
      return ++n;
    }).each('end', function () {
      if (! --n) {
        console.log('performed a real transition');
        next();
      }
    });
  };
}

// render function renders a view or if pushes onNext to
// loadSubject if there is none to render
function renderView(state) {
  var message = state.message,
      next = state.next,
      emitter = state.emitter;

  var stack = next.value;
  var events = message.events,
      key = message.key;

  var parent = events[0].parent;

  stack.forEach(function (transition) {
    var packEmitter = callNext(emitter, key, parent);

    parent[0].call(transition, packEmitter);
  });
}

// // this step distinguishes it is a next binding step out to process
// // or a rendering step
function render(state) {
  console.log(state);
  if (state.next.type === _globalKeys.BIND) {
    dataView(state);
  } else if (state.next.type === _globalKeys.RENDER) {
    // should break down what this is variable wise
    renderView(state);
  } else if (state.next.type === 'finish') {
    state.next.value();
  } else {
    // error should be passed to rxjs
    var str = 'view in view.js is receiving an undefied object fix this';
    var err = new Error(str);
    throw err;
  }
}

exports.default = render;