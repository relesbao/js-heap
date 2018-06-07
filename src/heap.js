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
    return this;
  }
}

export const HeapKind = {
  MIN: 'min',
  MAX: 'max',
};

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
