"use strict";
cc._RF.push(module, 'c71f7a9X49J1aWwh5QD7NTF', 'BackManager');
// Script/mg/BackManager.ts

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
var LoginManager_1 = require("./LoginManager");
var ethers_1 = require("ethers");
var DfinityAgent = require("../Lib/dfinity-agent");
var backend_did_1 = require("./backend.did");
var Actor = DfinityAgent.Actor;
var HttpAgent = DfinityAgent.HttpAgent;
var DefData_1 = require("./DefData");
var BackManager = /** @class */ (function () {
    function BackManager() {
        this.backendActor = null;
    }
    BackManager.prototype.Init = function () {
        // 预加载后端交互所需的脚本
    };
    // private isEditorOrPreview(): boolean {
    //     return ((typeof CC_EDITOR !== 'undefined' && (CC_EDITOR as any)) ||
    //         (typeof CC_PREVIEW !== 'undefined' && (CC_PREVIEW as any))) as any;
    // }
    BackManager.prototype.getGlobal = function () {
        return (typeof globalThis !== 'undefined'
            ? globalThis
            : (typeof window !== 'undefined'
                ? window
                : (typeof self !== 'undefined' ? self : {})));
    };
    BackManager.prototype.getBackendCanisterId = function () {
        var g = this.getGlobal();
        var injected = (g && (g.CANISTER_ID_backend || g.CANISTER_ID_BACKEND || g.BACKEND_CANISTER_ID));
        if (injected && typeof injected === 'string' && injected.length > 0)
            return injected;
        if (DefData_1.DFX_NETWORK === 'local')
            return DefData_1.BACKEND_CANISTER_ID_LOCAL_FALLBACK;
        return null;
    };
    BackManager.prototype.getAgentHost = function () {
        var g = this.getGlobal();
        // 如果是本地开发环境，强制指向本地 replica 地址，避免 Cocos Preview (localhost:7456) 拦截请求
        if (DefData_1.DFX_NETWORK === 'local') {
            return 'http://127.0.0.1:4943';
        }
        // 如果是 IC 主网，host 设为 undefined 或 "https://ic0.app"，HttpAgent 默认会连接主网
        return "https://ic0.app";
    };
    BackManager.prototype.ensureBackendActor = function () {
        return __awaiter(this, void 0, Promise, function () {
            var identity, canisterId, host, agent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.backendActor)
                            return [2 /*return*/, this.backendActor];
                        //if (this.isEditorOrPreview()) throw new Error('Backend actor disabled in editor/preview');
                        return [4 /*yield*/, LoginManager_1.default.Instance.ensureAuthClient()];
                    case 1:
                        //if (this.isEditorOrPreview()) throw new Error('Backend actor disabled in editor/preview');
                        _a.sent();
                        return [4 /*yield*/, LoginManager_1.default.Instance.getIdentity()];
                    case 2:
                        identity = _a.sent();
                        canisterId = this.getBackendCanisterId();
                        if (!canisterId)
                            throw new Error('Backend canisterId not found');
                        host = this.getAgentHost();
                        agent = new HttpAgent({ identity: identity, host: host });
                        if (!(DefData_1.DFX_NETWORK === 'local' && agent && agent.fetchRootKey)) return [3 /*break*/, 4];
                        return [4 /*yield*/, agent.fetchRootKey()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        this.backendActor = Actor.createActor(backend_did_1.idlFactory, { agent: agent, canisterId: canisterId });
                        return [2 /*return*/, this.backendActor];
                }
            });
        });
    };
    BackManager.prototype.getEthAddress = function () {
        return __awaiter(this, void 0, Promise, function () {
            var actor, publicKey, pkBytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureBackendActor()];
                    case 1:
                        actor = _a.sent();
                        return [4 /*yield*/, actor.get_eth_public_key()];
                    case 2:
                        publicKey = _a.sent();
                        pkBytes = new Uint8Array(publicKey);
                        return [2 /*return*/, ethers_1.ethers.utils.computeAddress(ethers_1.ethers.utils.hexlify(pkBytes))];
                }
            });
        });
    };
    BackManager.Instance = new BackManager();
    return BackManager;
}());
exports.default = BackManager;

cc._RF.pop();