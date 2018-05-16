import Node from './Node.js';

export default class Trie {
  constructor() {
    this.count = 0;
    this.root = new Node('root');
  }
  insert(word) {
    if (word) { 
      this.count++;
    }
    let splitWord = word.split('');
    let currNode = this.root;
    while (splitWord.length) {
      let letter = splitWord.shift();
      if(!currNode.child[letter]) {
        currNode.child[letter] = new Node(letter);
      }
      currNode = currNode.child[letter];
    }
    currNode.isLastLetter = true;
  }
  suggest(fragment) {
    let currNode = this.root;
    let fragmentArray = [...fragment];
    let suggestionArray = [];
    let word = fragment;

// find node of last letter in fragment.......
    fragmentArray.forEach(letter => {
      currNode = currNode.child[letter];
    })

// follow nodes to last letter of word
//return the last letter, build the word backwards to last frag-letter node
//push word to array of suggested words
//follow next path of children to next 'last letter' and repeat
    const findWords = (node) => {
      let word = '';
      if (node.isLastLetter) {
        return node.data;
      }
      let letterKeys = Object.keys(node.child);

      word = letterKeys.reduce((word, letterKey) => {
        //console.log(letter)
        let letters = node.data + findWords(node.child[letterKey]);
        console.log(letters);
        return letters;
      },'')
      return word;
    }
    suggestionArray.push(findWords(currNode));
    return suggestionArray;
  }
}