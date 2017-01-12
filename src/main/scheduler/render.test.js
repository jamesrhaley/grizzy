import { expect } from 'chai';
import render from './render';

describe('render', () => {

  it('Should throw a new error', () => {
    let state = {};
    state.next = {type: 'unexpected'};
    state.message = {};
    state.message.previous = undefined;
    expect( () => render(state) )
      .to.throw(/view.js is/);
  });
});