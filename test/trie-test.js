import { expect } from 'chai';
import Trie from "../lib/Trie.js";
import fs from 'fs';


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
      
      let expected = {
      numberOfWords: 1,
      root: {
          data: "root",
          child: {
              d: {
                  data: "d",
                  child: {
                      o: {
                          data: "o",
                          child: {
                              g: {
                                  "data": "g",
                                  "child": {},
                                  "completeWord": "dog"
                              }
                          },
                          completeWord: null
                      }
                  },
                  completeWord: null
              }
          },
          completeWord: null
        }
      }

      expect(trie).to.deep.eq(expected);
    })

    it('should not dublicate nodes', () => {
      trie.insert('dog');
      trie.insert('doggie');
      trie.insert('dad');

      let expected = {
      numberOfWords: 3,
      root: {
          data: "root",
          child: {
              d: {
                  data: "d",
                  child: {
                      o: {
                          data: "o",
                          child: {
                              g: {
                                  data: "g",
                                  child: {
                                      g: {
                                          data: "g",
                                          child: {
                                              i: {
                                                  data: "i",
                                                  child: {
                                                      e: {
                                                          data: "e",
                                                          child: {},
                                                          completeWord: "doggie"
                                                      }
                                                  },
                                                  completeWord: null
                                              }
                                          },
                                          completeWord: null
                                      }
                                  },
                                  completeWord: "dog"
                              }
                          },
                          completeWord: null
                      },
                      a: {
                          data: "a",
                          child: {
                              d: {
                                  data: "d",
                                  child: {},
                                  completeWord: "dad"
                              }
                          },
                          completeWord: null
                      }
                  },
                  completeWord: null
              }
          },
          completeWord: null
        }
      }   
      expect(trie).to.deep.eq(expected);
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
      console.log(JSON.stringify(trie, null, 4))
      trie.delete('doggie');
      console.log(JSON.stringify(trie, null, 4))

    })

  })
})