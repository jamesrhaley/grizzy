// set so first functions call immediately
function setIntervalAndExecute(fn, t) {
    fn();
    return(setInterval(fn, t));
}

// message called if user does not return something from the 
// drip.  Cannot be undefined
const errorMessage = 'Must not return Undefined from drip';

/*
 * callAndCancel -> cancel the drip after a certain number of times
 *
 * {fn:Function} -> denfine changes of state over the drip
 * {times:Number} -> number of times of the drip
 */
function callAndCancel(fn, times){
  return {
    callback: fn,
    clear: (interval, count) => {
      if(count === times) {
        clearInterval(interval);
      }     
    }
  }
}

/* 
 * addMethodTo -> added the method to the rx prototype 
 *
 * in order to chain in with other rx methods
 * {rx:Libray} -> RxJS
 */
function addMethodTo(rx) {
  var proto = rx.Observable.prototype;

  /*
   * drip -> realeses state as defined by your call back
   *
   * {fn:Function} -> args(data, iteration)
   *    denfine changes of state over the drip,
   *    the iteration is passed on to the callback
   * {starAt:Number} -> (default=0) how long until the drip starts
   * {interval:Number} -> what interval the drip will happen
   */
  proto.drip = function (fn, starAt, interval) {
    const source = this;
    let count = 0;
    let callFn = undefined;

    // sets the value of starAt if only two arguments
    if (arguments.length === 2) {
      interval = starAt;
      starAt = 0;
    };
    
    // set up drip object if it just a function or and object
    // with a set number of times before it cancels
    if (typeof fn === 'function') {
      callFn = callAndCancel(fn, Infinity);
    } else {
      callFn = fn;
    };
    
    // return a chained Observable
    return rx.Observable.create(function (observer) {
      // Our disposable is the subscription from the parent
      return source.delay(starAt).subscribe(
        function (data) {
      		let myinterval = setIntervalAndExecute(()=>{
            let iteration = count;
      			count += 1;
            
            // cancel interval if needed
      			callFn.clear(myinterval, count);
      			
            // capture the new state to be feed down the
            // pipeline
      			const nextData = callFn.callback(data, iteration);
        		
            // data should not be undefined
        		if(typeof nextData !== 'undefined') {
        			observer.onNext(nextData);
            } else {
               observer.onError(errorMessage);
            }

      		}, interval);
        },
        observer.onError.bind(observer),
        observer.onCompleted.bind(observer)
      );
    });
  };
}

var drip = {addMethodTo, callAndCancel}

export default drip;