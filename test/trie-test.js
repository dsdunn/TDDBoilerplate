import { expect } from 'chai';
import Trie from "../lib/Trie.js";
import fs from 'fs';

// import locus for debugging ?


describe('Trie', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();  
  })

  describe('insert', () => {

    it('should count words added', () => {
      expect(trie.numberOfWords).to.eq(0);
      trie.insert('cat');
      trie.insert('cats');
      trie.insert('cottage');
      trie.insert('comb');
      expect(trie.numberOfWords).to.eq(4);
    });

    it('should not take the same word more than once', () => {
      expect(trie.numberOfWords).to.eq(0);
      trie.insert('cat');
      trie.insert('cat');
      expect(trie.numberOfWords).to.eq(1);
    })

    it('should change all strings to lowercase', () => {
      trie.insert('DOG');
      trie.insert('dog');
      expect(trie.numberOfWords).to.eq(1);
    })

    it('should split words into nested nodes of letters', () => {

      trie.insert('dog');
      
      let expected = 'g';
      let actual = trie.root.child.d.child.o.child.g.data;

      expect(actual).to.eq(expected);
    })

    it('should not dublicate nodes', () => {
      trie.insert('dog');
      trie.insert('doggie');
      trie.insert('dad');

      let actual = Object.keys(trie.root.child.d.child.o.child).length;
         
      expect(actual).to.eq(1);
    })

  });

  describe('suggest', () => {

    it('should return an empy array if argument absent, or invalid. or no suggestions exist', () => {
      trie.insert('cat');
      trie.insert('cats');
      trie.insert('cottage');
      trie.insert('comb');

      expect(trie.suggest('r')).to.deep.eq([]);
      expect(trie.suggest('')).to.deep.eq([]);
      expect(trie.suggest(7)).to.deep.eq([]);

    })

    it('should return an empy array if no suggestions exist', () => {
      trie.insert('cat');
      trie.insert('cats');
      trie.insert('cottage');
      trie.insert('comb');

      expect(trie.suggest('r')).to.deep.eq([]);
    })

    it('should give suggestions if they exist', () => {
      trie.insert('cat');
      trie.insert('cats');
      trie.insert('cottage');
      trie.insert('comb');
      
      expect(trie.suggest('co')).to.deep.eq([ 'cottage', 'comb' ]);
    });

    it('should be case insensitive', () => {
      trie.insert('DOG');
      trie.insert('dog');

      expect(trie.suggest('D')).to.deep.eq(['dog']);
      expect(trie.suggest('d')).to.deep.eq(['dog']);
    })

  });

  describe ('count', () => {

    it('should return the number of words in the trie', () => {
      trie.insert('mouse');
      expect(trie.count()).to.eq(1);   
    })
  })

  describe('populate', () => {
    it('should take an array of words and insert each word', () => {
      const text = "/usr/share/dict/words"
      const dictionary = fs.readFileSync(text).toString().trim().split('\n')

      const completion = new Trie();

      completion.populate(dictionary);
      expect(completion.count()).to.eq(234371);
      expect(completion.suggest('world')).to.deep.eq(['world',
  'worlded',
  'worldful',
  'worldish',
  'worldless',
  'worldlet',
  'worldlike',
  'worldlily',
  'worldliness',
  'worldling',
  'worldly',
  'worldmaker',
  'worldmaking',
  'worldproof',
  'worldquake',
  'worldward',
  'worldwards',
  'worldway',
  'worldy']);
    })
  })

  describe('delete', () => {

    it('removes the nodes of input word that arent shared', () => {

      trie.insert('doggie');
      trie.insert('dog');
      trie.delete('doggie');
    
      expect(trie.suggest('do')).to.deep.eq(['dog']);
      expect(trie.numberOfWords).to.eq(1);
    })

  })
})
      //console.log(JSON.stringify(trie, null, 4))