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
  var O = rx.Observable;

  /*
   * drip realeses state as defined by your callback every time an
   * animation finished
   *
   * {Function} fn - args(data, iteration) denfine changes of state over
   *    the drip, the iteration is passed on to the callback
   * {Observable} listenStream - stream that triggers the change
   */

  O.prototype.drip = function(fn, listenStream) {
    const source = this;
    let count = 0;
    
    // return a chained Observable
    return rx.Observable.create(function (observer) {
      return source.combineLatest(listenStream)
        .subscribe(
          (data) => {
            const nextData = fn(data[0], count)

            // data should not be undefined
            if(typeof nextData !== 'undefined') {
              observer.onNext(nextData);
            } else {
               observer.onError(errorMessage);
            }

            count++;

          },
          observer.onError.bind(observer),
          observer.onCompleted.bind(observer)
        );
    });
  };
}

var drip = {addMethodTo, callAndCancel}


export default drip;