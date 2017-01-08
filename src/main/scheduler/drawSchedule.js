import moduleKeys from './moduleKeys';
import { schQ } from './pipeline';
import id from './id';

const { PRE } = moduleKeys();
/**
 * drawSchedule:
 *  exactly the same as draw except to be used with load.  drawSchedule
 *  causes nothing to happen on its own.  It returns an object to be
 *  rendered by load.
 *  ```
 *  const axis = drawSchedule(...args);
 *  const bar = drawSchedule(...args);
 *  load('barAnimation', axis, bar);
 *  ```
 *
 *  The big differnece is there needs to be a second argument to pass to 
 *  the function durring rendering.  Under the hood an event listener is
 *  used to know when the function completes asynchronously. Notice in the
 *  main example the following code.
 *  ```
 *  (selection, done) =>
 *    ...
 *    .call(done)
 * ```
 * In order for the sequence to complete an argument must be given to the 
 * function and it must be called at the end.
 *
 * @todo have a verification to make sure an argument is given to the
 *  function that is called by .call.
 *
 * @see {@link draw}
 * @see {@link load}
 *
 * @param {String} what - what will be picked in the selection 
 * @param {D3Object} parent - the svg that will be render new images
 * @param {Object} settings - All of the functionality of the view of
 *   component. must include properties data, and is.
 * @return {Object} this is description.
 * @property {String} string type used interally
 * @property {Function} bind function that will bind or not bind data to 
 *  the DOM
 * @property {Object} is functions render DOM nodes with D3 
 *
 * @example
 * function bar(parent, data, helpers) {
 *   let {size, x, y} = helpers;
 * 
 *   return drawSchedule('.bar', parent, {
 *     data: data,
 *     is:{
 *       enter: (selection, done) => {
 *         return selection.enter().append('rect')
 *           .attr({
 *             'class': 'bar',
 *             'x': (d) => x(d.letter),
 *             'width': x.rangeBand(),
 *             'y': (d) => y(d.frequency),
 *             'height': (d) => size.height - y(d.frequency)
 *           })
 *           .style({
 *             'opacity': 0
 *           })
 *           .transition().delay(100)
 *           .style({
 *             'opacity': 1
 *           })
 *           .call(done);
 *       }
 *     }
 *   });
 * }
 *
 */
function drawSchedule(what, parent, settings) {
  let {data, is} = settings;
  let applyArgs = undefined;
  let dataBinder = undefined;

  parent = data === false ? parent : parent.selectAll(what);

  if (!(data instanceof Array 
        && data[1] instanceof Function)){
    applyArgs = [data];
  } else {
    applyArgs = data;
  }

  if (data) {
    dataBinder = () => {
      return parent.data.apply(parent, applyArgs);
    };
  } else {
    dataBinder = () => {
      return parent;
    };
  }

  return {
    type: PRE,
    bind: {dataBinder},
    is: is
  };
}

/**
 * load
 *  what each transition to schq to be rendered in sequential order.  Any
 *  time this function is call all previous transition are canceled.
 *
 * @see {@link drawSchedule}
 *
 * @param {String} stringId - a unique id so schq can use an event listener
 *  to know when transitions have ended.
 * @param {...Function} transitions - a series of functions that return 
 *  transition objects
 */
function load(stringId, ...transitions) {
  let key = id(stringId);

  schQ.loader(transitions, key);
}

export {drawSchedule, load};
