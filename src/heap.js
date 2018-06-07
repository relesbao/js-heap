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
