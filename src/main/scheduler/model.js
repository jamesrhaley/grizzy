import {
  RENDER,
  PRE_BIND,
  BIND
} from './scheduler_globals';

// state is held in this object
// While javascript is dynamic, most implementations prefer
// being explicit
module.exports.transitionState = {
  packed: [],
  dataBinder: [],
  parent: [], 
  keys: [],
  is: {},
  len: 0,
  flag: false,
  time: undefined,
  callIndex: -1,
  type: 'base',
  stage: '',
  out: undefined
};

// helper function to report how many transition
// are out to be renders
function checkOut(obj) {
  return obj !== undefined ? obj.length : 0;
}


function packDataBind(state, update) {
  let {dataBinder, create, keys, is, len, time} = update;

  let next = {
    packed: [],
    dataBinder: dataBinder,
    parent: create,
    keys: keys,
    is: is,
    len: len,
    flag: false,
    callIndex: -1,
    time: time,
    type: BIND,
    stage: 'post-bind',
    out: 0
  };

  return next;
}

function packTransition(state, boundDOM) { 
  let i, transition; 
  
  // check if there are transition still out for process
  if (boundDOM.hasOwnProperty('returnCount')) {
    let countObjectsOut = state.out - boundDOM.returnCount;

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
  i = (state.callIndex += 1);
  transition = state.is[state.keys[i]];

  if (state.callIndex === 0) {

    return Object.assign({}, state, {
      packed: [{
        parent:boundDOM.parent,
        transition: transition,
        time: state.time
      }],
      parent: boundDOM.parent,
      out: checkOut(transition),
      stage: 'start',
      flag: false,
      type: RENDER
    });
  }

  else if (state.callIndex < state.len) {

    return Object.assign({}, state, {
      packed: [{
        parent:state.parent,
        transition: transition,
        time: state.time
      }],
      stage: 'continue',
      out: checkOut(transition),
      flag: false,
      type: RENDER
    });
  } 

  else {
    return Object.assign({}, state, {
      packed: [],
      stage: 'empty',
      out: checkOut(transition),
      flag: false,
      type: RENDER
    });
  }
}

export function dataModel(state, update) {
  //stage where data gets passed down
  let type = update !== undefined ? update.type : 'done';
  // console.log('state',state,'\n','update',update)
  switch (type) {
    case PRE_BIND:
      return packDataBind(state, update);
      break

    case RENDER:
      return packTransition(state, update)
      break;

    case 'done':
      // nothing is happening right now. test later to make
      // sure it stays the same.
      break
    
    default:
      break; 
   }
}
