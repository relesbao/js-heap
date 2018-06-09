'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.HeapFactory = HeapFactory;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getParentIndex(index) {
  if (index < 1) {
    return 0;
  }
  return Math.floor((index - 1) / 2);
}

function getLeftNodeIndex(index) {
  return 2 * index + 1;
}

function getRightNodeIndex(index) {
  return 2 * index + 2;
}

var HeapNode = function () {
  function HeapNode(data) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : data;

    _classCallCheck(this, HeapNode);

    this._data = data;
    if (Number.isNaN(parseFloat(value)) || !Number.isFinite(value)) {
      throw new TypeError('value must be a number, ' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)) + ' given');
    }
    this._value = value;
  }

  _createClass(HeapNode, [{
    key: 'data',
    get: function get() {
      return this._data;
    }
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    }
  }]);

  return HeapNode;
}();

var HeapKind = exports.HeapKind = {
  MIN: 'min',
  MAX: 'max'
};

var Heap = function () {
  function Heap(kind) {
    _classCallCheck(this, Heap);

    this._data = [];
    this._kind = kind;
  }

  _createClass(Heap, [{
    key: 'Add',
    value: function Add(data) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : data;

      var node = new HeapNode(data, value);
      this._data.push(node);
      if (this._data.length > 1) {
        this._bubbleUp(this._data.length - 1);
      }
      return this;
    }
  }, {
    key: 'Shift',
    value: function Shift() {
      if (this._data.length === 1) {
        return this._data.shift();
      }
      var lastIndex = this._data.length - 1;
      this._swap(0, lastIndex);
      var node = this._data.pop();
      this._bubbleDown(0);
      return node;
    }
  }, {
    key: '_mustSwap',
    value: function _mustSwap(indexA, indexB) {
      switch (this.kind) {
        case HeapKind.MIN:
          return this._data[indexA].value < this._data[indexB].value;
        case HeapKind.MAX:
          return this._data[indexA].value > this._data[indexB].value;
        default:
          return false;
      }
    }
  }, {
    key: '_bubbleUp',
    value: function _bubbleUp(index) {
      if (index > 0) {
        var parent = getParentIndex(index);
        if (this._mustSwap(index, parent)) {
          this._swap(index, parent);
          this._bubbleUp(parent);
        }
      }
    }
  }, {
    key: '_bubbleDown',
    value: function _bubbleDown(index) {
      if (index < this._data.length) {
        var leftIndex = getLeftNodeIndex(index);
        var rightIndex = getRightNodeIndex(index);
        if (leftIndex <= this._data.length - 1) {
          var whichCompareIndex = leftIndex;
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
  }, {
    key: '_swap',
    value: function _swap(indexA, indexB) {
      var tempA = this._data[indexA];
      this._data[indexA] = this._data[indexB];
      this._data[indexB] = tempA;
      return this;
    }
  }, {
    key: 'kind',
    get: function get() {
      return this._kind;
    }
  }, {
    key: 'data',
    get: function get() {
      return this._data;
    }
  }]);

  return Heap;
}();

function HeapFactory(kind) {
  switch (kind) {
    case HeapKind.MAX:
      return new Heap(HeapKind.MAX);
    case HeapKind.MIN:
      return new Heap(HeapKind.MIN);
    default:
      return new Heap(HeapKind.MIN);
  }
}