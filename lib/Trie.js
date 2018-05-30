import Node from './Node.js';

class Trie {
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
    let suggestionsArray = [];
    let currNode = this.find(fragment);

    if (!currNode) {
      return [];
    }
    getWords(currNode);
    suggestionsArray = this.sortAndReduceSuggestions(suggestionsArray);
    return suggestionsArray;

    function getWords(node) {
      if (node.completeWord) {
        suggestionsArray.push({
          word: node.completeWord,
          popularity: node.popularity
        });
      }
      let keys = Object.keys(node.child);

      keys.forEach(key => {
        getWords(node.child[key]);
      });
    }
  }
  sortAndReduceSuggestions(suggestionsArray) {
    suggestionsArray.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    suggestionsArray = suggestionsArray.reduce((array, obj) => {
      array.push(obj.word);
      return array;
    }, []);
    return suggestionsArray;
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
    let currNode = this.find(word);
    
    if (currNode) {
      currNode.completeWord = null;
      this.numberOfWords--;
    }
  } 
  find(word) {
    let currNode = this.root;
    let splitWord = [...word.toLowerCase()];

    while (splitWord.length) {
      if (currNode.child[splitWord[0]]) {
        currNode = currNode.child[splitWord.shift()];
      } else {
        return null;
      }
    }
    return currNode;
  }
  select(word) {
    let currNode = this.find(word);

    currNode.popularity++;
  }
  includes(word) {
    if (this.find(word)) {
      return true;
    } else {
      return false;
    }
  }
}
module.exports = Trie;
