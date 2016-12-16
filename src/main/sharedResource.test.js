import {Queue, isEmpty} from './sharedResource';

describe('isEmpty', function () {
  it('Empty Array should be true', function() {
    expect(isEmpty([])).to.be.true;
  });

  it('Empty Object should be true', function() {
    expect(isEmpty({})).to.be.true;
  });

  it('An Array with elements should be false', function() {
    expect(isEmpty([1,2])).to.be.flase;
  });

  it('An Object with elements should be false', function() {
    expect(isEmpty({a:1})).to.be.false;
  });
});

describe('Queue', function () {
  var q = new Queue();

  it('Should enqueue', function() {
    q.enqueue(1)
    expect(q.length).to.equal(1);
  });


  it('Should dequeue', function() {
    var value = q.dequeue()
    expect(value).to.equal(1);
  });

});