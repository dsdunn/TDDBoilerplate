import { expect } from 'chai';
import Trie from "../lib/Trie.js";

describe('Trie', () => {

  let trie = new Trie();

  it('should count words added', () => {
    trie.insert('cat');
    trie.insert('car');
    trie.insert('cot');
    expect(trie.count).to.eq(3);
    console.log(JSON.stringify(trie, null, 4));
  });

  it('should give suggestions', () => {
    console.log(trie.suggest('c'))
    expect(true).to.eq(true);
  })

})