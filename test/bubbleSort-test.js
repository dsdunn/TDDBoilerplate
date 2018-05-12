import { assert } from 'chai';
import { bubbleSort, bubbleSortRecursive } from '../lib/bubbleSort.js';
import generateArray from './utilities';

describe('bubbleSort', function () {
  it('should sort an array', function () {
    //let array = generateArray(10);

    let array = [1, 15, 2, 22];

    assert.deepEqual(bubbleSort(array), array.sort((a, b) => {
      return a -b;
    }));
  });
});

