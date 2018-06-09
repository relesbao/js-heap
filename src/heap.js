function getParentIndex(index) {
  if (index < 1) {
    return 0;
  }
  return Math.floor((index - 1) / 2);
}

function getLeftNodeIndex(index) {
  return (2 * index) + 1;
}

function getRightNodeIndex(index) {
  return (2 * index) + 2;
}

class HeapNode {
  constructor(data, value = data) {
    this._data = data;
    if (Number.isNaN(parseFloat(value)) || !Number.isFinite(value)) {
      throw new TypeError(`value must be a number, ${typeof value} given`);
    }
    this._value = value;
  }

  get data() {
    return this._data;
  }

  get value() {
    return this._value;
  }
}

export const HeapKind = {
  MIN: 'min',
  MAX: 'max',
};

class Heap {
  constructor(kind) {
    this._data = [];
    this._kind = kind;
  }

  get kind() {
    return this._kind;
  }

  get data() {
    return this._data;
  }

  Add(data, value = data) {
    const node = new HeapNode(data, value);
    this._data.push(node);
    if (this._data.length > 1) {
      this._bubbleUp(this._data.length - 1);
    }
    return this;
  }

  Shift() {
    if (this._data.length === 1) {
      return this._data.shift();
    }
    const lastIndex = this._data.length - 1;
    this._swap(0, lastIndex);
    const node = this._data.pop();
    this._bubbleDown(0);
    return node;
  }

  _mustSwap(indexA, indexB) {
    switch (this.kind) {
      case HeapKind.MIN:
        return this._data[indexA].value < this._data[indexB].value;
      case HeapKind.MAX:
        return this._data[indexA].value > this._data[indexB].value;
      default:
        return false;
    }
  }

  _bubbleUp(index) {
    if (index > 0) {
      const parent = getParentIndex(index);
      if (this._mustSwap(index, parent)) {
        this._swap(index, parent);
        this._bubbleUp(parent);
      }
    }
  }

  _bubbleDown(index) {
    if (index < this._data.length) {
      const leftIndex = getLeftNodeIndex(index);
      const rightIndex = getRightNodeIndex(index);
      if (leftIndex <= this._data.length - 1) {
        let whichCompareIndex = leftIndex;
        if (rightIndex <= this.data.length - 1) {
          whichCompareIndex = this._mustSwap(leftIndex, rightIndex) ? leftIndex : rightIndex;
        }
        if (this._mustSwap(whichCompareIndex, index)) {
          this._swap(whichCompareIndex, index);
          this._bubbleDown(whichCompareIndex);
        }
      }
    }
  }

  _swap(indexA, indexB) {
    const tempA = this._data[indexA];
    this._data[indexA] = this._data[indexB];
    this._data[indexB] = tempA;
    return this;
  }
}

export function HeapFactory(kind) {
  switch (kind) {
    case HeapKind.MAX:
      return new Heap(HeapKind.MAX);
    case HeapKind.MIN:
      return new Heap(HeapKind.MIN);
    default:
      return new Heap(HeapKind.MIN);
  }
}
