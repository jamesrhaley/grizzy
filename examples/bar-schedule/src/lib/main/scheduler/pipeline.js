'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawComplete = exports.subscription = exports.schQ = undefined;

var _schq = require('schq');

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _preprocess = require('./preprocess/preprocess');

var _preprocess2 = _interopRequireDefault(_preprocess);

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var drawComplete = new _rx2.default.ReplaySubject(1);

/**
 * for esdoc
 * @ignore
 */
// pre load settings to schQ
var schQ = new _schq.SchQ({
  preprocess: _preprocess2.default,
  lostData: 2,
  checkout: function checkout(obj) {
    return obj.value.length;
  },
  doLast: [{ type: 'finish', value: function value() {
      return drawComplete.onNext(true);
    } }]
});

var running = schQ.run();

/**
 * drawComplete:
 *  a disposable to dispose of a load sequence if you wish to remove it 
 *  from memory
 *  
 * @returns {Observable} - subscription disposable.
 * @example
 * subscription.dispose();
 */
var subscription = running.subscribe(_render2.default);

exports.schQ = schQ;
exports.subscription = subscription;
exports.drawComplete = drawComplete;