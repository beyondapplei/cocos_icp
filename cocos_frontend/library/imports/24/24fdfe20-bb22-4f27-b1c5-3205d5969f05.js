"use strict";
cc._RF.push(module, '24fdf4guyJPJ7HFMgXVlp8F', 'backend.did');
// Script/mg/backend.did.js

"use strict";

exports.__esModule = true;
exports.init = exports.idlFactory = void 0;

var idlFactory = function idlFactory(_ref) {
  var IDL = _ref.IDL;
  return IDL.Service({
    'get_eth_public_key': IDL.Func([], [IDL.Vec(IDL.Nat8)], []),
    'greet': IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'setGreeting': IDL.Func([IDL.Text], [], []),
    'sign': IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Vec(IDL.Nat8)], [])
  });
};

exports.idlFactory = idlFactory;

var init = function init(_ref2) {
  var IDL = _ref2.IDL;
  return [];
};

exports.init = init;

cc._RF.pop();