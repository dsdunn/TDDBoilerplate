import { assert } from 'chai';
import mergeSort from '../lib/mergeSort.js';
import generateArray from './utilities';

describe('mergeSort', function () {
  it('should sort an array', function () {

    let array = generateArray(100);

    assert.deepEqual(mergeSort(array), true);
  });
});