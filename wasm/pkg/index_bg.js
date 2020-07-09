import * as wasm from './index_bg.wasm';

function _assertNum(n) {
    if (typeof(n) !== 'number') throw new Error('expected a number argument');
}
/**
* @param {number} a
* @param {number} b
* @returns {number}
*/
export function add(a, b) {
    _assertNum(a);
    _assertNum(b);
    var ret = wasm.add(a, b);
    return ret >>> 0;
}

