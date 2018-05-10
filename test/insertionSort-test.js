import { assert } from 'chai';
import insertionSort from '../lib/insertionSort.js';

describe('insertionSort', function () {
  it('should sort an array', function () {

    let array = [5, 4, 3, 2, 1];

    assert.deepEqual(insertionSort(array), [1, 2, 3, 4, 5]);
  });
});