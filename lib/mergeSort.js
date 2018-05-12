//Sorting Suite

// MergeSort

export const mergeSort = (arr) => {
  const split = (toSplit) => {
    let secondHalf = toSplit.slice(Math.floor(toSplit.length/2));
    let firstHalf = toSplit.slice(0,Math.floor(toSplit.length/2));

    if(toSplit.length > 1) {
    return mergeSorted(split(firstHalf), split(secondHalf));
    }
    return mergeSorted(firstHalf, secondHalf);
  }
  const mergeSorted = (firstSorted, secondSorted) => {
      for( let j = 0; j < secondSorted.length; j++) {
        if(firstSorted[0] < secondSorted[j]) {
          secondSorted.splice(j, 0, firstSorted.shift());
        } 
      }
      while(firstSorted.length) {
        secondSorted.push(firstSorted.shift())
      }
    return secondSorted;
  }
  return split(arr)
}
