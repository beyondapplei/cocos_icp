"use strict";
cc._RF.push(module, 'cc4adUR/31Jw4N3bibQaiHc', 'GlobalPolyfill');
// Script/mg/GlobalPolyfill.ts

"use strict";
/**
 * Polyfill for Node.js globals in browser environment.
 * Must be imported BEFORE any @dfinity libraries.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var g = (typeof globalThis !== 'undefined'
    ? globalThis
    : (typeof window !== 'undefined'
        ? window
        : (typeof self !== 'undefined' ? self : {})));
if (typeof g.global === 'undefined') {
    g.global = g;
}
if (typeof g.process === 'undefined') {
    g.process = {
        env: { NODE_ENV: 'production' },
        version: '',
        nextTick: function (cb) { return setTimeout(cb, 0); },
        browser: true,
    };
}
// Do NOT declare a top-level `const Buffer = ...` here.
// Only assign to global Buffer to avoid clashes with concatenated libraries.
if (typeof g.Buffer === 'undefined') {
    try {
        var b = require('buffer');
        g.Buffer = b && b.Buffer ? b.Buffer : b;
    }
    catch (e) {
        // ignore: if buffer polyfill isn't available, dfintiy libs may still fail later.
    }
}
// TextEncoder/TextDecoder are required by some deps in older runtimes.
if (typeof g.TextEncoder === 'undefined') {
    try {
        var util = require('util');
        if (util && util.TextEncoder)
            g.TextEncoder = util.TextEncoder;
    }
    catch (e) { }
}
if (typeof g.TextDecoder === 'undefined') {
    try {
        var util = require('util');
        if (util && util.TextDecoder)
            g.TextDecoder = util.TextDecoder;
    }
    catch (e) { }
}

cc._RF.pop();