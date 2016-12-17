import { expect } from 'chai';
import { Queue, isEmpty } from './sharedResource';

describe('isEmpty', () => {
  it('Empty Array should be true', () => {
    expect(isEmpty([])).to.be.true;
  });

  it('Empty Object should be true', () => {
    expect(isEmpty({})).to.be.true;
  });

  it('An Array with elements should be false', () => {
    expect(isEmpty([1,2])).to.be.flase;
  });

  it('An Object with elements should be false', () => {
    expect(isEmpty({a:1})).to.be.false;
  });
});

describe('Queue', () => {
  var q = new Queue();

  it('Should enqueue', () => {
    
    q.enqueue(1);

    expect(q.length).to.equal(1);
  });


  it('Should dequeue', () => {
    var value = q.dequeue();
    
    expect(value).to.equal(1);
  });

});