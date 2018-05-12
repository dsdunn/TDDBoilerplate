import { assert } from 'chai';
import insertionSort from '../lib/insertionSort.js';
import generateArray from './utilities';

describe('insertionSort', function () {
  it('should sort an array', function () {

    let array = generateArray(100);

    assert.deepEqual(insertionSort(array), array.sort());
  });
});