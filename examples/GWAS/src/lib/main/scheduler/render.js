'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moduleKeys2 = require('./moduleKeys');

var _moduleKeys3 = _interopRequireDefault(_moduleKeys2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _moduleKeys = (0, _moduleKeys3.default)(),
    BIND = _moduleKeys.BIND,
    RENDER = _moduleKeys.RENDER,
    FINISH = _moduleKeys.FINISH;

// views are in this case where the side effects are.  This is where
// d3 either is binding data to the DOM or rendering updates

// binds data to the dom if any and returns the parent object
// to apply transitions on.


function dataView(state) {
  var message = state.message,
      next = state.next,
      emitter = state.emitter;

  var binderArray = next.value;
  var key = message.key;
  var parent = binderArray.map(function (binder) {
    return binder();
  });

  var packet = {
    type: BIND,
    parent: parent
  };

  emitter.emit(key, packet);
}

function callNext(emitter, key, parent) {
  return function (transition) {
    var n = 0;
    var next = function next() {
      emitter.emit(key, {
        type: RENDER,
        parent: parent
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

/**
 * this step distinguishes it is a next binding step out to process
 * or a rendering step
 *
 * for esdoc
 * @ignore
 */
function render(state) {
  if (state.next.type === BIND) {
    dataView(state);
  } else if (state.next.type === RENDER) {
    // should break down what this is variable wise
    renderView(state);
  } else if (state.next.type === FINISH) {
    state.next.value();
  } else {
    // error should be passed to rxjs
    var str = 'view in view.js is receiving an undefied object fix this';
    var err = new Error(str);
    throw err;
  }
}

exports.default = render;