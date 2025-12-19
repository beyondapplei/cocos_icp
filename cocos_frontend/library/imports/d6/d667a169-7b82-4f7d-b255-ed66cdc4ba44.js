"use strict";
cc._RF.push(module, 'd667aFpe4JPfbJV7WbNxLpE', 'icp_ledger.did');
// Script/mg/icp_ledger.did.js

"use strict";

exports.__esModule = true;
exports.init = exports.idlFactory = void 0;

// Minimal ICRC-1 interface for ICP Ledger (supports icrc1_balance_of / icrc1_transfer)
// Works with @dfinity/agent style Actor.createActor(IDL)
var idlFactory = function idlFactory(_ref) {
  var IDL = _ref.IDL;
  var Subaccount = IDL.Vec(IDL.Nat8);
  var Account = IDL.Record({
    owner: IDL.Principal,
    subaccount: IDL.Opt(Subaccount)
  });
  var TransferError = IDL.Variant({
    BadFee: IDL.Record({
      expected_fee: IDL.Nat
    }),
    BadBurn: IDL.Record({
      min_burn_amount: IDL.Nat
    }),
    InsufficientFunds: IDL.Record({
      balance: IDL.Nat
    }),
    TooOld: IDL.Null,
    CreatedInFuture: IDL.Record({
      ledger_time: IDL.Nat64
    }),
    Duplicate: IDL.Record({
      duplicate_of: IDL.Nat
    }),
    TemporarilyUnavailable: IDL.Null,
    GenericError: IDL.Record({
      error_code: IDL.Nat,
      message: IDL.Text
    })
  });
  var TransferArg = IDL.Record({
    from_subaccount: IDL.Opt(Subaccount),
    to: Account,
    fee: IDL.Opt(IDL.Nat),
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(IDL.Nat64),
    amount: IDL.Nat
  });
  var TransferResult = IDL.Variant({
    Ok: IDL.Nat,
    Err: TransferError
  });
  return IDL.Service({
    icrc1_balance_of: IDL.Func([Account], [IDL.Nat], ["query"]),
    icrc1_transfer: IDL.Func([TransferArg], [TransferResult], []),
    icrc1_symbol: IDL.Func([], [IDL.Text], ["query"]),
    icrc1_decimals: IDL.Func([], [IDL.Nat8], ["query"]),
    icrc1_fee: IDL.Func([], [IDL.Nat], ["query"])
  });
};

exports.idlFactory = idlFactory;

var init = function init(_ref2) {
  var IDL = _ref2.IDL;
  return [];
};

exports.init = init;

cc._RF.pop();