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
        if(!currNode.child[letter]) {
          currNode.child[letter] = new Node(letter);
        }
        currNode = currNode.child[letter];
      }
      if (!currNode.completeWord) { 
        this.numberOfWords++ 
      }
      currNode.completeWord = word;
    }
  }
  suggest (fragment) {
    let currNode = this.root;
    let suggestionArray = [];
    let fragmentArray = [...fragment.toLowerCase()];

    fragmentArray.forEach(letter => {
      currNode = currNode.child[letter];
    })
    const getWords = (node) => {
      if (node.completeWord) {
        suggestionArray.push(node.completeWord);
      }
      let keys = Object.keys(node.child);

      keys.forEach(key => {
        getWords(node.child[key])
      })
    }
    getWords(currNode);
    return suggestionArray;
  }
  count() {
    return this.numberOfWords;
  }
}
  
  // suggest(fragment) {
  //   let currNode = this.root;
  //   let fragmentArray = [...fragment];
  //   let suggestionArray = [];
  //   //let word = fragment;

  //   fragmentArray.forEach(letter => {
  //     currNode = currNode.child[letter];
  //   })

  //   const findWords = (node) => {
  //     if (node.isLastLetter) {
  //       return node.data;
  //     }
  //     let letterKeys = Object.keys(node.child);
  //    // console.log(letterKeys);

  //     let word = letterKeys.reduce((word, letterKey) => {
  //       let suggestion = word + node.data + findWords(node.child[letterKey]);
  //       //console.log(suggestion)
  //       suggestionArray.push(suggestion);
  //       return word;
  //     },fragment)

  //     return word;
  //   }
  //   findWords(currNode);
  //   return suggestionArray;
  // }