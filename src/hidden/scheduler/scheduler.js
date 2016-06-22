import Rx from 'rx';
import {queueSubject, scheduleSubject} from './main';
import {
  LOAD, BIND, PRE_BIND
} from './scheduler_globals';

/**
drawSchedule -> creates an object that encompasses all 
parts of one animation 

same settings a draw
*/
function drawSchedule(what, parent, settings){
  let data = settings.data
  , create = data === false ? parent : parent.selectAll(what)
  , keys = Object.keys(settings.is)
  , len = keys.length
  , is = settings.is
  , applyArgs = undefined
  , dataBinder;

  if (!(data instanceof Array 
        && data[1] instanceof Function)){
    applyArgs = [data];
  } else {
    applyArgs = data;
  }

  if (data) {
    dataBinder = () => {
      return create.data.apply(create, applyArgs);
    }
  } else {
    dataBinder = () => {
      return create;
    }
  }

  return {
    type: PRE_BIND,
    // if problems up comment this out
    // parent: create,
    dataBinder,
    is,
    keys,
    len
  }
}

// this is where I am need to think about this one.
// step one create a queue of all of the steps
function load(...transitions){
  queueSubject.onNext({
    type: LOAD,
    time: Date.now(),
    transitions
  });

  return transitions;
}

export { drawSchedule, load };
