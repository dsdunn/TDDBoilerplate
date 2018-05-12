const generateArray = (length) => {
  let array = [];
    for (let i = 0; i < length; i++) {
      array.push(Math.floor(Math.random() * 100));
  }
  return array;
}

module.exports = generateArray;