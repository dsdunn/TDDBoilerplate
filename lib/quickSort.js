const quickSort = (arr) => {
  if (arr.length < 2) {
    return arr;
  }
  let pivot = arr.pop();
  let firstHalf = [];
  let secondHalf = [];

  arr.forEach((num) => {
    if (num < pivot) {
      firstHalf.push(num)
    } else {
      secondHalf.push(num)
    }  
  });
  return [...quickSort(firstHalf), pivot, ...quickSort(secondHalf)] 
}

module.exports = quickSort;