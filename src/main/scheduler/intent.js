var Rx = require('rx');

module.exports = {
  queueSubject : new Rx.ReplaySubject(1),
  scheduleSubject : new Rx.ReplaySubject(1)
};