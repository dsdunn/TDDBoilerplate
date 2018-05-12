import { assert } from 'chai';
//import quickSort from '../lib/quickSort.js';
import generateArray from './utilities';
const quickSort = require('../lib/quickSort.js');

describe('quickSort', function () {
  it('should sort an array', function () {
    let array = generateArray(10);
    let newArray = [...array];
    console.log(array.sort((a, b) => {
      return a - b;
    }), quickSort(newArray));

    assert.deepEqual(quickSort(newArray), array.sort((a, b) => {
      return a - b;
    }));
  });
});
