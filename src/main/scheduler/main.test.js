import { queueSubject } from './intent';

describe('queueSubject', function () {
  const gather = [];

  before(function (done) {

    var subscription = queueSubject.subscribe(
      (x) => {
        gather.push(x)
      },
      (err) => {
        console.log('Error: ' + err);
      },
      () => {

        gather.push('Completed');
        
        done();
      });

    queueSubject.onNext('a');
    queueSubject.onNext('b');
    queueSubject.onNext('c');
    queueSubject.onCompleted();

    subscription.dispose()
  });

  it('Should be [a, b, c, Completed]"', function() {
    expect(gather).to.eql(['a', 'b', 'c', 'Completed']);
  });
});