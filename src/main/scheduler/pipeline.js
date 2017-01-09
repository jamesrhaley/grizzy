import { SchQ } from 'schq';
import Rx from 'rx';
import preprocess from './preprocess';
import render from './render';

/**
 * drawComplete:
 *  When you need to know when the asynchronous sequence you have created 
 *  has ended.  This will only fire when every step completes, but not 
 *  when load is called interrupting a sequence midway through.
 *  
 * @returns {Observable} - subscription to final event of sequence.
 * @example
 * // with rxjs
 * ...
 *   .whatEverYourCurrentStreamIsToTiggerEvents
 *   .merge(drawComplete)
 *   .map(....)
 * 
 * // or as a promise
 * let promise = new Promise(function(resolve) {
 *   drawComplete.subscribe(x => resolve(x));
 * });
 * 
 * promise
 *   .then(function(resolve) {
 *     ...do something
 *   });
 */
// since the subcribtion will be created after the fact this is a 
// ReplaySubject.
const drawComplete = new Rx.ReplaySubject(1);

/**
 * for esdoc
 * @ignore
 */
// pre load settings to schQ
const schQ = new SchQ({
  preprocess,
  lostData : 2,
  checkout : (obj) => obj.value.length,
  doLast : [{type:'finish', value: () => drawComplete.onNext(true)}]
});

const running = schQ.run();

/**
 * drawComplete:
 *  a disposable to dispose of a load sequence if you wish to remove it 
 *  from memory
 *  
 * @returns {Observable} - subscription disposable.
 * @example
 * subscription.dispose();
 */
const subscription = running
  .subscribe(render);

export { schQ, subscription, drawComplete };

