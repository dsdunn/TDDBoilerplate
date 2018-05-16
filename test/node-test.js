import { expect } from 'chai';
import Node from '../lib/node.js';

describe('Node', () => {

  let node = new Node("some-data");

  it('should instatiate a new instance of Node', () => {
    expect(node).to.be.an.instanceof(Node);
  });

  it('should take an argument of data', () => {
    expect(node.data).to.eq('some-data');
  })

  it('should have a default child property of an empty object', () => {
    expect(node.child).to.deep.equal({});
  })

  it('should have a default completeWord property set to null', () => {
    expect(node.completeWord).to.eq(null);
  })
});