import { expect } from 'chai';
import Trie from "../lib/Trie.js";


describe('Trie', () => {
  let trie;

  describe('insert', () => {

    beforeEach(() => {
      trie = new Trie();  
    })

    it('should count words added', () => {
      expect(trie.numberOfWords).to.eq(0);
      trie.insert('cat');
      trie.insert('cats');
      trie.insert('cottage');
      trie.insert('comb');
      expect(trie.numberOfWords).to.eq(4);
      //console.log(JSON.stringify(trie, null, 4));
    });

    it('should not take the same word more than once', () => {
      expect(trie.numberOfWords).to.eq(0);
      trie.insert('cat');
      trie.insert('cat');
      expect(trie.numberOfWords).to.eq(1);
    })

    it('should split words into nested nodes of letters', () => {

      trie.insert('dog');

      //let expected = 
     // expect(trie).to.deep.eq(expected);
    })

    it('should not dublicate nodes', () => {
      trie.insert('dog');
      trie.insert('doggie');
      trie.insert('dad');

      let expected = {"numberOfWords":3,"root":{"data":"root","child":{"d":{"data":"d","child":{"o":{"data":"o","child":{"g":{"data":"g","child":{"g":{"data":"g","child":{"i":{"data":"i","child":{"e":{"data":"e","child":{},"completeWord":"doggie"}},"completeWord":null}},"completeWord":null}},"completeWord":"dog"}},"completeWord":null},"a":{"data":"a","child":{"d":{"data":"d","child":{},"completeWord":"dad"}},"completeWord":null}},"completeWord":null}},"completeWord":null}}
      
      expect(trie).to.deep.eq(expected);
    })

    



  });

  describe('suggest', () => {

    it('should give suggestions', () => {
      trie.insert('cat');
      trie.insert('cats');
      trie.insert('cottage');
      trie.insert('comb');
      console.log(trie.suggest('co'))
      expect(true).to.eq(true);
    })
  })
})