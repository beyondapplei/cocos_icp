"use strict";
cc._RF.push(module, '08a3c6a7BVP3ZB0e1miMNXk', 'ICPManager');
// Script/mg/ICPManager.ts

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var UIManager_1 = require("../UIManager");
var LoginManager_1 = require("./LoginManager");
var DefData_1 = require("./DefData");
//可以用
var principal_1 = require("@dfinity/principal");
//不能用
// import { Actor, HttpAgent } from "@dfinity/agent";
// import { idlFactory } from "./icp_ledger.did";
var DfinityAgent = require("../Lib/dfinity-agent");
var icp_ledger_did_1 = require("./icp_ledger.did");
var Actor = DfinityAgent.Actor;
var HttpAgent = DfinityAgent.HttpAgent;
var ICPManager = /** @class */ (function () {
    function ICPManager() {
        this.ledgerActor = null;
        this.ledgerCanisterId = null;
    }
    ICPManager.prototype.ICPManager = function () {
    };
    ICPManager.prototype.Init = function () {
    };
    ICPManager.prototype.getAgentHost = function () {
        if (DefData_1.DFX_NETWORK === 'local') {
            return 'http://127.0.0.1:4943';
        }
        return 'https://ic0.app';
    };
    ICPManager.prototype.getDefaultLedgerCanisterId = function () {
        if (DefData_1.DFX_NETWORK === 'local') {
            return DefData_1.LEAGER_ICP_ID_LOCAL;
        }
        // ICP Ledger canister id on mainnet
        return 'ryjl3-tyaaa-aaaaa-aaaba-cai';
    };
    ICPManager.prototype.ensureLedgerActor = function (strLedgerCanisterId) {
        return __awaiter(this, void 0, Promise, function () {
            var canisterId, identity, host, agent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        canisterId = (strLedgerCanisterId && strLedgerCanisterId.trim())
                            ? strLedgerCanisterId.trim()
                            : this.getDefaultLedgerCanisterId();
                        cc.log("ICPManager: ensureLedgerActor using canisterId:", canisterId);
                        if (this.ledgerActor && this.ledgerCanisterId === canisterId) {
                            return [2 /*return*/, this.ledgerActor];
                        }
                        return [4 /*yield*/, LoginManager_1.default.Instance.ensureAuthClient()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, LoginManager_1.default.Instance.getIdentity()];
                    case 2:
                        identity = _a.sent();
                        host = this.getAgentHost();
                        agent = new HttpAgent({ identity: identity, host: host, verifyQuerySignatures: false });
                        if (!(DefData_1.DFX_NETWORK === 'local' && agent && agent.fetchRootKey)) return [3 /*break*/, 4];
                        return [4 /*yield*/, agent.fetchRootKey()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        //如果不是本地环境，不用调用 fetchRootKey
                        this.ledgerActor = Actor.createActor(icp_ledger_did_1.idlFactory, { agent: agent, canisterId: canisterId });
                        this.ledgerCanisterId = canisterId;
                        return [2 /*return*/, this.ledgerActor];
                }
            });
        });
    };
    ICPManager.prototype.parseIcpToE8s = function (amountText) {
        var s = (amountText || '').trim();
        if (!s)
            throw new Error('amount is empty');
        if (!/^[0-9]+(\.[0-9]+)?$/.test(s))
            throw new Error('invalid amount');
        var _a = s.split('.'), intPart = _a[0], fracPartRaw = _a[1];
        var fracPart = (fracPartRaw || '');
        if (fracPart.length > 8)
            throw new Error('too many decimals (max 8)');
        var fracPadded = (fracPart + '00000000').slice(0, 8);
        // 用 number 表示 e8s（TS target=es5，不使用 BigInt）。
        // 注意：只能安全表示 <= Number.MAX_SAFE_INTEGER 的 e8s。
        var e8s = parseInt(intPart, 10) * 100000000 + parseInt(fracPadded, 10);
        if (!Number.isFinite(e8s) || e8s < 0) {
            throw new Error('invalid amount');
        }
        if (e8s > Number.MAX_SAFE_INTEGER) {
            throw new Error('amount too large');
        }
        return e8s;
    };
    ICPManager.prototype.GetBalance = function (principalText, strLedgerCanisterId) {
        return __awaiter(this, void 0, Promise, function () {
            var pText, actor, owner, balanceE8sAny, balanceE8sNum, balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pText = (principalText || '').trim();
                        if (!pText)
                            return [2 /*return*/, 'Balance: 0 ICP'];
                        return [4 /*yield*/, this.ensureLedgerActor(strLedgerCanisterId)];
                    case 1:
                        actor = _a.sent();
                        cc.log("GetBalance principalText=", principalText);
                        owner = principal_1.Principal.fromText(pText);
                        return [4 /*yield*/, actor.icrc1_balance_of({ owner: owner, subaccount: [] })];
                    case 2:
                        balanceE8sAny = _a.sent();
                        balanceE8sNum = Number(balanceE8sAny && balanceE8sAny.toString ? balanceE8sAny.toString() : balanceE8sAny);
                        balance = balanceE8sNum / 1e8;
                        cc.log("GetBalance balance=", balance);
                        return [2 /*return*/, "Balance: " + balance.toFixed(8) + " ICP"];
                }
            });
        });
    };
    ICPManager.prototype.SendICP = function (toPrincipalText, amountText, strLedgerCanisterId) {
        return __awaiter(this, void 0, Promise, function () {
            var toText, actor, toOwner, amountE8s, res, err, errStr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        toText = (toPrincipalText || '').trim();
                        if (!toText)
                            throw new Error('to address is empty');
                        return [4 /*yield*/, this.ensureLedgerActor(strLedgerCanisterId)];
                    case 1:
                        actor = _a.sent();
                        cc.log("SendICP toText=", toText);
                        toOwner = principal_1.Principal.fromText(toText);
                        cc.log("SendICP toOwner=", toOwner);
                        amountE8s = this.parseIcpToE8s(amountText);
                        cc.log("SendICP to=" + toText + " amount=" + amountText + " (" + amountE8s + " e8s)");
                        return [4 /*yield*/, actor.icrc1_transfer({
                                from_subaccount: [],
                                to: { owner: toOwner, subaccount: [] },
                                fee: [],
                                memo: [],
                                created_at_time: [],
                                amount: amountE8s,
                            })];
                    case 2:
                        res = _a.sent();
                        if (res && (res.Ok !== undefined)) {
                            UIManager_1.default.ShowTip("SendICP ok, blockIndex=" + res.Ok);
                            return [2 /*return*/, "OK: blockIndex=" + res.Ok];
                        }
                        err = res && res.Err ? res.Err : res;
                        errStr = JSON.stringify(err, function (key, value) { return (typeof value === 'bigint' ? value.toString() : value); });
                        throw new Error("SendICP failed: " + errStr);
                }
            });
        });
    };
    ICPManager.Instance = new ICPManager();
    return ICPManager;
}());
exports.default = ICPManager;

cc._RF.pop();