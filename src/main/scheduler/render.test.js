import { expect } from 'chai';
import render from './render';

describe('render', () => {

  it('Should throw a new error', () => {
    let state = {};
    state.next = {type: 'unexpected'};

    expect( () => render(state) )
      .to.throw(/view.js is/);
  });
});