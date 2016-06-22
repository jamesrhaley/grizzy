import Rx from 'rx';
import { Queue , isEmpty } from '../helpers/sharedResource';

import {queueSubject, scheduleSubject} from './intent'
import {transitionState, dataModel} from './model'
import {views} from './view'
import {
  LOAD,
  PRE_BIND,
  FINISH
} from './scheduler_globals';

var masterTime = 0;

const ignoreOld = (x) => x.time === masterTime;

const backFromRenderStream = scheduleSubject
  .filter(ignoreOld);

const stagedState = {
  staged: {},
  queue: new Queue(),
  time: 0
};

function queueModel(acc, curr) {
  if (curr.type === LOAD) {
    let Q = new Queue();

    masterTime = curr.time

    curr.transitions.forEach( transition => {
      Q.enqueue(transition)
    });

    return {
      staged: Q.dequeue(),
      queue: Q,
      time: curr.time
    }
  } 

  else if (curr.type === FINISH) {
    let Q = acc.queue;

    if (Q.length > 0) {
      return {
        staged: Q.dequeue(),
        queue: Q,
        time: acc.time   
      }
    } else {
      return stagedState;
    }
  }
}

// this will also have a step to call for another 
// dequeued item when all transitions are done
// for clarity startWith is used with a templete of
// what the model is.  Skip prevents that empty model
// from being streamed to the next stage.
const queueStream = queueSubject
  .startWith(stagedState)
  .scan(queueModel)
  .skip(1)
  .filter(obj => !isEmpty(obj.staged));
  

// shape object if it is a plain object
const singleStream = queueStream
  .filter(staged => !Array.isArray(staged))
  .map(preTransition => {
    let pre = preTransition.staged
    let transitions = pre.is;
    let keys = Object.keys(transitions)
    let is = {};

    keys.forEach(key => {
      is[key] = [transitions[key]];
    })

    let post = Object.assign({}, pre, {
      time: preTransition.time,
      dataBinder: [pre.dataBinder],
      is
    })

    return post;
  });

const mergeSubject = Rx.Observable.merge( 
  singleStream, backFromRenderStream
);

mergeSubject
  .startWith(transitionState)
  .scan(dataModel)
  .skip(1)
  // if transitions are still out, filter stops
  // state from returning
  .filter(state => !state.flag)
  .subscribe((transitionStage) => {
    views(transitionStage);
  }); 


export { queueSubject, scheduleSubject };
