import { assert } from 'chai';
//import insertionSort from '../lib/insertionSort.js';
import generateArray from './utilities';
const insertionSort = require('../lib/insertionSort.js');

describe('insertionSort', function () {
  it('should sort an array', function () {

    let array = generateArray(100);
    let array1 = [...array];

    assert.deepEqual(insertionSort(array), array.sort((a,b) => {
      return b - a;
    }));
  });
});