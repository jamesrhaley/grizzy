const la = require('lazy-ass')
const is = require('check-more-types')
var isEqual = require('lodash.isequal');

const Rx = require('rx')
const array = [1, 2, 3, 4, 5, 6, 8]
const evenNumbers_ = Rx.Observable.fromArray(array)
  .filter(x => x % 2 === 0)

describe('even numbers', () => {
	const val = (x) => console.log(x)
  const noop = () => {}
  it('finishes', (done) => {
    evenNumbers_.subscribe(noop, noop, done)
  })

  it('has 4 numbers', (done) => {
	  var count = 0
	  const onNumber = () => { count += 1 }
	  evenNumbers_.subscribe(onNumber, noop, () => {
	    la(count === 4, 'got 4 numbers', count)
	    done()
	  })
	})
})