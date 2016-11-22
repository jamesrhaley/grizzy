// even-numbers.js
const Rx = require('rx')
const array = [1, 2, 3, 4, 5, 6]
const evenNumbers_ = Rx.Observable.fromArray(array)
  .filter(x => x % 2 === 0)

module.exports = evenNumbers_