import Node from './Node.js';

export default class Trie {
  constructor() {
    this.numberOfWords = 0;
    this.root = new Node('root');
  }
  insert(word) {
    if (word) { 
      let splitWord = word.toLowerCase().split('');
      let currNode = this.root;

      while (splitWord.length) {
        let letter = splitWord.shift();

        if (!currNode.child[letter]) {
          currNode.child[letter] = new Node(letter);
        }
        currNode = currNode.child[letter];
      }
      if (!currNode.completeWord) { 
        this.numberOfWords++; 
      }
      currNode.completeWord = word.toLowerCase();
    }
  }
  suggest (fragment) {
    if (!fragment || typeof fragment !== 'string') { 
      return [];
    }
    let currNode = this.root;
    let suggestionArray = [];
    let fragmentArray = [...fragment.toLowerCase()];
    let noResults = false;

    fragmentArray.forEach(letter => {
      if (!currNode.child[letter]) {
        noResults = true;
      }
      if (currNode.child[letter]) {
        currNode = currNode.child[letter];
      }
    });
    if (noResults) {
      return [];
    }
    const getWords = (node) => {
      if (node.completeWord) {
        suggestionArray.push(node.completeWord);
      }
      let keys = Object.keys(node.child);

      keys.forEach(key => {
        getWords(node.child[key]);
      });
    };

    getWords(currNode);
    return suggestionArray;
  }
  count() {
    return this.numberOfWords;
  }
  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    });
  }
  delete(word) {
    let currNode = this.root;
    let splitWord = [...word.toLowerCase()];

    this.numberOfWords--;
    
    while (splitWord.length) {
      currNode = currNode.child[splitWord.shift()];
    }
    currNode.completeWord = null;
  }
}
  
