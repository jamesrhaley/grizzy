import moduleKeys from './moduleKeys';

const { BIND, RENDER, FINISH } = moduleKeys();

// views are in this case where the side effects are.  This is where
// d3 either is binding data to the DOM or rendering updates

// binds data to the DOM if any and returns the parent object
// to apply transitions on.
function dataView(message, next, emitter){
  let binderArray = next.value;
  let key = message.key;
  let parent = binderArray.map(binder => binder());

  let packet = {
    type: BIND,
    parent: parent
  };

  emitter.emit(key, packet);
}


function callNext(emitter, key, parent) {
  return (transition) => {
    let n = 0;
    let next = () => {
      emitter.emit(key, {
        type: RENDER,
        parent
      });
    };

    if (transition.namespace === undefined || transition.empty()) {  
      return next();
    }

    transition 
      .each(() => ++n) 
      .each('end', () => { 
        if (!--n) {
          next();
        }
      }); 
  };
}

// render function renders a view or if pushes onNext to
// loadSubject if there is none to render
function renderView(message, next, emitter) {
  let stack = next.value;
  let {previous, key} = message;
  let parent = previous[0].parent;

  stack.forEach(transition => {
    let packEmitter = callNext(emitter, key, parent);

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
  let {message, next, emitter} = state;

  if (next.type === BIND) {
    dataView(message, next, emitter);
  }
  else if (next.type === RENDER) {
    // should break down what this is variable wise
    renderView(message, next, emitter);
  }
  else if (next.type === FINISH) {
    next.value();
  }
  else {
    // error should be passed to rxjs
    let str = 'view in view.js is receiving an undefied object fix this';
    let err = new Error(str);
    throw err;
  }
}


export default render;