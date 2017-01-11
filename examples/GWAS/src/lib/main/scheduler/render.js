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

// binds data to the DOM if any and returns the parent object
// to apply transitions on.


function dataView(message, next, emitter) {
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
function renderView(message, next, emitter) {
  var stack = next.value;
  var previous = message.previous,
      key = message.key;

  var parent = previous[0].parent;

  stack.forEach(function (transition, i) {
    var readyEmitter = callNext(emitter, key, parent);

    parent[i].call(transition, readyEmitter);
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
  var message = state.message,
      next = state.next,
      emitter = state.emitter;


  if (next.type === BIND) {
    dataView(message, next, emitter);
  } else if (next.type === RENDER) {
    // should break down what this is variable wise
    renderView(message, next, emitter);
  } else if (next.type === FINISH) {
    next.value();
  } else {
    // error should be passed to rxjs
    var str = 'view in view.js is receiving an undefied object fix this';
    var err = new Error(str);
    throw err;
  }
}

exports.default = render;