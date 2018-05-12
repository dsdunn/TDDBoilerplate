import { assert } from 'chai';
import mergeSort from '../lib/mergeSort.js';
import generateArray from './utilities';

describe('mergeSort', function () {
  it('should sort an array', function () {

    let array = generateArray(10);
    let array1 = [...array];
    console.log(array.sort((a, b) => {
      return a - b;
    }), mergeSort(array1));

    assert.deepEqual(mergeSort(array1), array.sort((a, b) => {
      return a - b;
    }));
  });
});