import { expect } from 'chai';
import Trie from "../lib/Trie.js";

describe('Trie', () => {

  let trie = new Trie();

  it('should count words added', () => {
    trie.insert('cat');
    trie.insert('cat');
    trie.insert('cot');
    trie.insert('cottage');
    trie.insert('comb');
    expect(trie.count).to.eq(4);
    console.log(trie.count);
    console.log(JSON.stringify(trie, null, 4));
  });

  it('should give suggestions', () => {
    console.log(trie.suggest('co'))
    expect(true).to.eq(true);
  })
})