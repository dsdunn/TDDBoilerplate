// Sorting Suite

// Bubble Sort

const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 1; j < arr.length -i; j++) {
      if (arr[j-1] > arr[j]) {
        [arr[j-1], arr[j]] = [arr[j], arr[j-1]];
      }
    }
  }
  return arr;
}

const recursiveBubbleSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    if(arr[i] < arr[i-1]) {
      [arr[i], arr[i-1]] = [arr[i-1], arr[i]];
      inversionSort(arr)
    }
  }
  return arr;
}

module.exports = bubbleSort;
