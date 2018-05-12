// Sorting Suite

// Bubble Sort

export const bubbleSort = (arr) => {
  let sortedArray = [...arr];
  for (let i = 0; i < sortedArray.length; i++) {
    for (let j = 1; j < sortedArray.length -i; j++) {
      if (sortedArray[j-1] > sortedArray[j]) {
        [sortedArray[j-1], sortedArray[j]] = [sortedArray[j], sortedArray[j-1]];
      }
    }
  }
  return sortedArray;
}


export const reduceBubbleSort = (arr) => {
  return arr.reduce((array, element) => {
    for (let j = 1; j < array.length; j++) {
      if(array[j] < array[j - 1]) {
        [array[j], array[j - 1]] = [array[j - 1], array[j]];
      }
    } 
    return array
  }, [...arr])
}


export const recursiveBubbleSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    if(arr[i] < arr[i-1]) {
      [arr[i], arr[i-1]] = [arr[i-1], arr[i]];
      inversionSort(arr)
    }
  }
  return arr;
}


