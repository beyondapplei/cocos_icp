"use strict";
cc._RF.push(module, '6e971pdgjxJPqWh1HjZH0As', 'LoginManager');
// Script/mg/LoginManager.ts

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
require("./GlobalPolyfill");
var DfinityAuthClient = require("../Lib/dfinity-auth-client");
var AuthClient = DfinityAuthClient.AuthClient;
var DefData_1 = require("./DefData");
var LoginManager = /** @class */ (function () {
    function LoginManager() {
        this.authClient = null;
    }
    LoginManager.prototype.Init = function () {
        // void this.ensureAuthClient().catch(() => {
        //     // UI 层自行提示；这里不抛出
        // });
    };
    // private isEditorOrPreview(): boolean {
    //     return ((typeof CC_EDITOR !== 'undefined' && (CC_EDITOR as any)) ||
    //         (typeof CC_PREVIEW !== 'undefined' && (CC_PREVIEW as any))) as any;
    // }
    // private getGlobal(): any {
    //     return (typeof globalThis !== 'undefined'
    //         ? globalThis
    //         : (typeof window !== 'undefined'
    //             ? window
    //             : (typeof self !== 'undefined' ? self : {})));
    // }
    LoginManager.prototype.ensureAuthClient = function () {
        return __awaiter(this, void 0, Promise, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.authClient)
                            return [2 /*return*/, this.authClient];
                        return [4 /*yield*/, AuthClient.create()];
                    case 1:
                        client = _a.sent();
                        if (!client)
                            throw new Error('AuthClient creation failed');
                        this.authClient = client;
                        return [2 /*return*/, this.authClient];
                }
            });
        });
    };
    LoginManager.prototype.isAuthenticated = function () {
        return __awaiter(this, void 0, Promise, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureAuthClient()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.isAuthenticated()];
                    case 2: return [2 /*return*/, !!(_a.sent())];
                }
            });
        });
    };
    LoginManager.prototype.getIdentity = function () {
        return __awaiter(this, void 0, Promise, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureAuthClient()];
                    case 1:
                        client = _a.sent();
                        return [2 /*return*/, client.getIdentity()];
                }
            });
        });
    };
    LoginManager.prototype.getPrincipalText = function () {
        if (!this.authClient)
            return null;
        try {
            var identity = this.authClient.getIdentity();
            return identity.getPrincipal().toText();
        }
        catch (_a) {
            return null;
        }
    };
    LoginManager.prototype.formatErrorMessage = function (err) {
        if (!err)
            return 'Unknown error';
        if (typeof err === 'string')
            return err;
        if (err instanceof Error && err.message)
            return err.message;
        if (typeof err.message === 'string' && err.message)
            return err.message;
        if (typeof err.error === 'string' && err.error)
            return err.error;
        try {
            return JSON.stringify(err);
        }
        catch (_a) {
            return String(err);
        }
    };
    // loginCallBack(): void {
    //     // no op
    //     EventManager.Instance.FireEvent(ECMDID.LoginSuccess);
    // }
    LoginManager.prototype.login = function (onSuccessCallBack, onError) {
        var _this = this;
        if (!this.authClient) {
            if (onError)
                onError(new Error("AuthClient not ready"));
            return;
        }
        var iiUrl = '';
        if (DefData_1.DFX_NETWORK === 'local') {
            iiUrl = "http://" + DefData_1.II_CANISTER_ID_LOCAL + ".localhost:4943/#authorize";
        }
        else {
            iiUrl = 'https://identity.ic0.app/#authorize';
        }
        this.authClient.login({
            identityProvider: iiUrl,
            onSuccess: function () {
                if (onSuccessCallBack)
                    onSuccessCallBack();
            },
            onError: function (err) {
                var msg = "Login failed: " + _this.formatErrorMessage(err);
                if (onError)
                    onError(new Error(msg));
            },
        });
    };
    LoginManager.Instance = new LoginManager();
    return LoginManager;
}());
exports.default = LoginManager;

cc._RF.pop();