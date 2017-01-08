import { expect } from 'chai';
import id from './id';

describe('id', () => {

  it('it should return id after id', () => {

    expect( id('key') ).to.equal('key0');
    
    expect( id('key') ).to.equal('key1');
  });

  it('if not provided a key gz will procced it', () => {
    expect( id() ).to.equal('gz2');
  });
});