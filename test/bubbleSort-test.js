import { assert } from 'chai';
import bubbleSort from '../lib/bubbleSort.js';

describe('bubbleSort', function () {
  it('should sort an array', function () {

    let array = [5, 4, 3, 2, 1];

    assert.deepEqual(bubbleSort(array), [1, 2, 3, 4, 5]);
  });
});

