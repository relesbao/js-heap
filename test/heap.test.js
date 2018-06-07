import { assert, expect } from 'chai';
import { describe, it } from 'mocha';
import { HeapKind, HeapFactory } from './../src/heap';

describe('HeapFactory', () => {
  it('should create a min heap if no argument is received', () => {
    const Heap = HeapFactory();
    assert.equal(Heap.kind, HeapKind.MIN);
  });
  it('should create a min heap if HeapKind.MIN is received', () => {
    const Heap = HeapFactory(HeapKind.MIN);
    assert.equal(Heap.kind, HeapKind.MIN);
  });
  it('should create a max heap if HeapKind.MAX is received', () => {
    const Heap = HeapFactory(HeapKind.MAX);
    assert.equal(Heap.kind, HeapKind.MAX);
  });
});

describe('Heap', () => {
  it('should start empty', () => {
    const EmptyHeap = HeapFactory();
    expect(EmptyHeap.data).to.be.an('array').that.is.empty;
  });

  describe('HeapNode', () => {
    const Heap = HeapFactory();
    it('should create e new HeapNode without the need to pass a value if the data is a number', () => {
      const Heap = HeapFactory();
      Heap.Add(1);
      expect(Heap.data).length.to.be.greaterThan(0);
    });
    it('should throw a type error when trying to create a HeapNode without a numeric value', () => {
      expect(() => Heap.Add('test')).to.throw(TypeError);
    });
  });
});
