import { expect } from 'chai';
import { queueSubject } from './intent';

describe('queueSubject', () => {
  const gather = [];

  before(function (done) {

    var subscription = queueSubject.subscribe(
      (x) => {
        gather.push(x);
      },
      (err) => {
        console.error('Error: ' + err);
      },
      () => {

        gather.push('Completed');
        
        done();
      });

    queueSubject.onNext('a');
    queueSubject.onNext('b');
    queueSubject.onNext('c');
    queueSubject.onCompleted();

    subscription.dispose();
  });

  it('Should be [a, b, c, Completed]"', () => {
    expect(gather).to.eql(['a', 'b', 'c', 'Completed']);
  });
});