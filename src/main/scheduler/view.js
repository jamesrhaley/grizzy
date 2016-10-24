var {queueSubject, scheduleSubject} = require('./intent');
var { 
  BIND,
  RENDER,
  FINISH,
  PRE_RENDER,
  CALL_NEXT
} = require('./scheduler_globals');

// views are in this case where the side effects are.  This is where
// d3 either is binding data to the DOM or rendering updates

// binds data to the dom if any and returns the parent object
// to apply transitions on.
function dataView(state){
  let binders = state.dataBinder;
  let len = binders.length;
  let parent = [];

  for (let i = 0; i < len; i++) {
    let bound = binders.shift();
    parent.push(bound());
  }

  scheduleSubject.onNext({
    type: RENDER,
    stage: PRE_RENDER,
    parent,
    time: state.time
  })
}

/**
* callNext -> passed to a d3 transision through 
* d3.(select).call pushes a value to scheduleSubject
* specific to d3
* onNext
*/
function callNext(time) {
  return (transition) => {
    let n = 0;
    let next = () => {
      scheduleSubject.onNext({
        type: RENDER,
        stage: CALL_NEXT,
        returnCount: 1,
        time: time
      });
    }

    if (transition.namespace === undefined || transition.empty()) {    
      return next();
    }

    transition 
      .each(() => ++n) 
      .each("end", () => { 
        if (!--n) {
          next();
        }
      }); 
  }
}

// render function renders a view or if pushes onNext to
// queueSubject if there is none to render
function renderView(state) {
  if (state.callIndex < state.len && state.parent !== undefined) {
    let stack = state.packed;
    stack.forEach(stage => {
      let parent = stage.parent;
      let transitions = stage.transition
      let len = transitions.length;
      
      // the transition contains the onNext to move
      // the transition forward uses scheduleSubject like 
      // dataView
      for (let i = 0; i < len; i++) {
        let callNextWithTime = callNext(stage.time)
        let trans = transitions.shift();
        parent[i].call(trans, callNextWithTime);        
      }
    });
  } 

  else {
    queueSubject.onNext({type: FINISH, time: state.time})
  }
}

// this step distinguishes it is a data binding step out to process
// or a rendering step
function views(state) {
  let type = state !== undefined ? state.type : 'done';

  if (type === BIND && state.dataBinder.length > 0) {
    dataView(state)  
  }
  else if (type === RENDER) {
    renderView(state) 
  }
  else {
    return false
  }
}

module.exports = {views};
