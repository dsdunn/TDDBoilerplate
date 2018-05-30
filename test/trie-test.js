import { expect } from 'chai';
import Trie from "../lib/Trie.js";
import fs from 'fs';

// import locus for debugging ?


describe('Trie', () => {

  let trie;

  beforeEach( () => {
    trie = new Trie();  
  })

  describe('find', () => {

    it('should exist', () => {
      expect(trie.find).to.exist;
    })

    it('should return the last node of selected word', () => {
      
      trie.insert('cat');
      trie.find('cat');

      let actual = trie.root.child.c.child.a.child.t;

      expect(trie.find('cat')).to.deep.equal(actual);
    })
  })

  describe('insert', () => {

    it('should exist', () => {
      expect(trie.insert).to.exist;
    })

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

    it('should exist', () => {
      expect(trie.suggest).to.exist;
    })

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

    it('should sort suggestions by popularity', () => {
      
      trie.insert('cats');
      trie.insert('cottage');
      trie.insert('comb');
      trie.select('cottage');
      trie.select('comb');
      trie.select('comb');

      expect(trie.suggest('c')).to.deep.equal(['comb','cottage','cats'])

    })

    it('should be case insensitive', () => {
      
      trie.insert('DOG');
      trie.insert('dog');

      expect(trie.suggest('D')).to.deep.eq(['dog']);
      expect(trie.suggest('d')).to.deep.eq(['dog']);
    })

  });

  describe ('count', () => {

    it('should exist', () => {
      expect(trie.count).to.exist;
    })

    it('should return the number of words in the trie', () => {
      
      trie.insert('mouse');

      expect(trie.count()).to.eq(1);   
    })
  })

  describe('populate', () => {

    it('should exist', () => {
      expect(trie.populate).to.exist;
    })

    it('should take an array of words and insert each word', () => {

      const words = ['mouse', 'cat', 'dog', 'hamster'];

      trie.populate(words);

      expect(trie.count()).to.eq(4);

      const text = "/usr/share/dict/words"
      const dictionary = fs.readFileSync(text).toString().trim().split('\n')

      trie.populate(dictionary);

      expect(trie.count()).to.eq(234371);
      expect(trie.suggest('world')).to.deep.eq(
        ['worldling',
        'world',
        'worldful',
        'worldish',
        'worldless',
        'worldlet',
        'worldlike',
        'worldlily',
        'worldliness',
        'worlded',
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
    it('should exist', () => {

      expect(trie.delete).to.exist;
    })

    it('reasigns completedWord of last node to null, omitting it from future suggestions', () => {

      trie.insert('doggie');
      trie.insert('dog');
      trie.delete('doggie');
    
      expect(trie.suggest('do')).to.deep.eq(['dog']);
      expect(trie.numberOfWords).to.eq(1);
    })

  })

  describe('select', () => {

    it('should exist', () => {
      expect(trie.select).to.exist;
    })

    it('should increment the popularity of the selected word', () => {

      trie.insert('dog');
      trie.insert('cat');

      expect(trie.find('dog').popularity).to.eq(0);

      trie.select('dog');

      expect(trie.find('dog').popularity).to.eq(1);
      expect(trie.find('cat').popularity).to.eq(0);

      trie.select('cat');
      trie.select('cat');

      expect(trie.find('cat').popularity).to.eq(2);
    })
  })

  describe('includes', () => {

    it('should exist', () => {
      expect(trie.includes).to.exist;
    })

    it('should return true or false, depending on whether entered word exists in trie', () => {

      trie.insert('dog');

      expect(trie.includes('dog')).to.eq(true);
      expect(trie.includes('cat')).to.eq(false);
    })
  })

  describe('sortAndReduceSuggestions', () => {

    it('should exist', () => {
      expect(trie.sortAndReduceSuggestions).to.exist;
    })

    it('should take in an array of objects, and return an array of words sorted by popularity', () => {

      let objArray = [
      {word: 'dog', popularity: 0},
      {word: 'cat', popularity: 2}];

      let expectedArray = ['cat','dog'];

      expect(trie.sortAndReduceSuggestions(objArray)).to.deep.equal(expectedArray);
    })
  })
})