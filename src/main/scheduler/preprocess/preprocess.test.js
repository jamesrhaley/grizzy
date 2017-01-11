import { expect } from 'chai';
import moduleKeys from './../moduleKeys';
import preprocess from './preprocess';
import isPlainObject from 'lodash/isPlainObject';
import isArray from 'lodash/isArray';

const { BIND, PRE, RENDER } = moduleKeys();

describe('preprocess', () => {
  const noop = function() {return;};

  const group1 = {
    type: PRE,
    bind: {noop},
    is : {
      enter: noop
    }
  };

  const group2 = [noop, noop, noop];

  const group3 = {
    type: PRE,
    bind: {noop},
    is : {
      enter: noop,
      update: noop,
      exit: noop
    }
  };
  describe('Test 1', () => {
    let result1 = preprocess([group1]);

    it('Should be an array', () => {
      expect( isArray( result1 ) ).to.be.true;
    });

    it('Should have a length of 2', () => {
      expect( result1.length ).to.equal(2);
    });

    it('Each index of Array is an object', () => {
      expect( isPlainObject( result1[0]) ).to.be.true;
      expect( isPlainObject( result1[1]) ).to.be.true;
    });
  });

  describe('Test 2', () => {
    let result2 = preprocess([group1, group1]);
    
    it('Should be an array', () => {
      expect( isArray( result2 ) ).to.be.true;
    });

    it('Should have a length of 4', () => {
      expect( result2.length ).to.equal(4);
    });

    it('Even index should have type of bind, odd should be type render', () => {
      expect( result2[0].type === BIND ).to.be.true;
      expect( result2[2].type === BIND ).to.be.true;
      expect( result2[1].type === RENDER ).to.be.true;
      expect( result2[3].type === RENDER ).to.be.true;
    });
  });

  describe('Test 3', () => {
    let result3 = preprocess([group2]);

    it('Should be an array', () => {
      expect( isArray( result3 ) ).to.be.true;
    });

    it('Should have a length of 1', () => {
      expect( result3.length ).to.equal(1);
    });

    it('Even index should have type of render', () => {
      expect( result3[0].type === RENDER ).to.be.true;
    });
  });

  describe('Test 4', () => {
    let result4 = preprocess([group2, group1, group1]);

    it('Should be an array', () => {
      expect( isArray( result4 ) ).to.be.true;
    });

    it('Should have a length of 5', () => {
      expect( result4.length ).to.equal(5);
    });

    it('types should be as expected', () => {
      expect( result4[0].type === RENDER ).to.be.true;
      expect( result4[1].type === BIND ).to.be.true;
      expect( result4[2].type === RENDER ).to.be.true;
      expect( result4[3].type === BIND ).to.be.true;
      expect( result4[4].type === RENDER ).to.be.true;
    });
  });

  describe('Test 5', () => {
    let result4 = preprocess([group3]);
 
    it('Should be an array', () => {
      expect( isArray( result4 ) ).to.be.true;
    });

    it('Should have a length of 4', () => {
      expect( result4.length ).to.equal(4);
    });
  });

  describe('Test 6', () => {
    let result5 = preprocess([[group3, group3], group3]);
 
    it('Should be an array', () => {
      expect( isArray( result5 ) ).to.be.true;
    });

    it('Should have a length of 8', () => {
      expect( result5.length ).to.equal(8);
    });
  });

  describe('Test 7', () => {
    it('Should throw', () => {
      expect( () => preprocess(['a']) ).to.throw(/Object or Function/);
    });
  });
});