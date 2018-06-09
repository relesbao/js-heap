import { assert, expect } from 'chai';
import { describe, it } from 'mocha';
import { HeapKind, HeapFactory } from './../src/heap';

function getChildren(index) {
  return {
    left: (2 * index) + 1,
    right: (2 * index) + 2,
  };
}

const dummyValues = [21, 5, 18, 9, 1, 17];

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
    it('should create a new HeapNode without the need to pass a value if the data is a number', () => {
      Heap.Add(1);
      expect(Heap.data).length.to.be.greaterThan(0);
    });
    it('should throw a type error when trying to create a HeapNode without a numeric value', () => {
      expect(() => Heap.Add('test')).to.throw(TypeError);
    });
    it('should create a heapNode with any type of data if the value is numeric', () => {
      const anyDataFn = () => 'anyDataFn';
      const nodeFn = Heap.Add(anyDataFn, 1);
      expect(Heap.data).to.deep.include(nodeFn);
      expect(nodeFn.data).to.deep.include(anyDataFn);

      const anyDataObj = { anyData: 'any', nestedFn: () => 'nestedFn' };
      const nodeObj = Heap.Add(anyDataObj, 1);
      expect(Heap.data).to.deep.include(nodeObj);
      expect(nodeObj.data).to.deep.include(anyDataObj);
    });
  });

  it('should remove the first element when shift is called', () => {
    const minHeap = HeapFactory(HeapKind.MIN);
    dummyValues.map(v => minHeap.Add(v));
    const firstValue = minHeap.Shift();
    expect(minHeap.data).to.not.include(firstValue);
  });

  it('should become empty if only one element is added and shift is called', () => {
    const minHeap = HeapFactory(HeapKind.MIN);
    minHeap.Add(1);
    minHeap.Shift();
    expect(minHeap.data).to.be.empty;
  });
});

describe('Min Heap Operations', () => {
  it('should have the minimum value as its first element', () => {
    const minHeap = HeapFactory(HeapKind.MIN);
    dummyValues.map(v => minHeap.Add(v));
    const firstValue = minHeap.Shift();
    expect(firstValue.value).to.be.equal(1);
  });

  it('should have the second minimum value as its first element after shift is called', () => {
    const minHeap = HeapFactory(HeapKind.MIN);
    dummyValues.map(v => minHeap.Add(v));
    minHeap.Shift();
    expect(minHeap.data[0].value).to.be.equal(5);
  });

  it('should have all its parents values to be less than or equal to its children', () => {
    const minHeap = HeapFactory(HeapKind.MIN);
    dummyValues.map(v => minHeap.Add(v));
    for (let i = 0; i < minHeap.data.length; i += 1) {
      const currentValue = minHeap.data[i].value;
      const children = getChildren(i);
      if (children.left < minHeap.data.length) {
        expect(minHeap.data[children.left].value).to.be.at.least(currentValue);
      }
      if (children.right < minHeap.data.length) {
        expect(minHeap.data[children.right].value).to.be.at.least(currentValue);
      }
    }
  });
});

describe('Max Heap Operations', () => {
  it('should have the maximum value as its first element', () => {
    const minHeap = HeapFactory(HeapKind.MAX);
    dummyValues.map(v => minHeap.Add(v));
    const firstValue = minHeap.Shift();
    expect(firstValue.value).to.be.equal(21);
  });

  it('should have the second maximum value as its first element after shift is called', () => {
    const minHeap = HeapFactory(HeapKind.MAX);
    dummyValues.map(v => minHeap.Add(v));
    minHeap.Shift();
    expect(minHeap.data[0].value).to.be.equal(18);
  });

  it('should have all its parents values to be greater than or equal its children', () => {
    const minHeap = HeapFactory(HeapKind.MAX);
    dummyValues.map(v => minHeap.Add(v));
    for (let i = 0; i < minHeap.data.length; i += 1) {
      const currentValue = minHeap.data[i].value;
      const children = getChildren(i);
      if (children.left < minHeap.data.length) {
        expect(minHeap.data[children.left].value).to.be.at.most(currentValue);
      }
      if (children.right < minHeap.data.length) {
        expect(minHeap.data[children.right].value).to.be.at.most(currentValue);
      }
    }
  });
});
