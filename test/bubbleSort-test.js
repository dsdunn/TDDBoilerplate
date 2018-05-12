import { assert } from 'chai';
import { bubbleSort, recursiveBubbleSort, reduceBubbleSort } from '../lib/bubbleSort.js';
import generateArray from './utilities';

describe('bubbleSort', function () {
  it('should sort an array', function () {
    let array = generateArray(1000);

    let newArray = [...array];

    assert.deepEqual(bubbleSort(array), array.sort((a, b) => {
      return a - b;
    }));
  });
});

