class Node {
  constructor(data) {
    this.data = data;
    this.child = {};
    this.completeWord = null;
    this.popularity = 0;
  }
}
module.exports = Node;