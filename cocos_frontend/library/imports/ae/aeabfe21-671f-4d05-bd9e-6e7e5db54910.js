"use strict";
cc._RF.push(module, 'aeabf4hZx9NBb2ebn5dtUkQ', 'HomePanel');
// Script/ui/HomePanel.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var UIPanel_1 = require("./UIPanel");
var UIManager_1 = require("../UIManager");
var BackManager_1 = require("../mg/BackManager");
var LoginManager_1 = require("../mg/LoginManager");
var CommonEnum_1 = require("../CommonEnum");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HomePanel = /** @class */ (function (_super) {
    __extends(HomePanel, _super);
    function HomePanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HomePanel.prototype.onLoad = function () {
        function onLoadTexturebEnd(err, spriteFrame) {
        }
        cc.loader.loadRes("texture/imagebg11", cc.SpriteFrame, onLoadTexturebEnd.bind(this));
        //在scene中预加载资源 后能显示
        //cc.loader.loadRes( "texture/bullet", cc.SpriteFrame);
        var btnBeginNode = this.node.getChildByName('btnbegin');
        btnBeginNode.on(cc.Node.EventType.TOUCH_END, this.clickLogin.bind(this, 109825), this);
        //此界面用的是homepanel.prefab
        var labelpidNode = this.node.getChildByName('labelpid');
        this.labelpid = labelpidNode.getComponent(cc.Label);
        var sproleNode = this.node.getChildByName('sprole');
        this.sprole = sproleNode.getComponent(cc.Sprite);
    };
    HomePanel.prototype.start = function () {
    };
    //在它被加入场景树并激活后，会先 onLoad()，等到下一轮/下一帧开始更新时再 start()
    HomePanel.prototype.OnOpen = function (strParam) {
        // Web Build 下提前初始化，保证点击时仍处于用户手势上下文（避免弹窗被浏览器拦截）
        UIManager_1.default.ShowTip("HomePanel start");
        this.uiend();
    };
    HomePanel.prototype.OnClose = function () {
    };
    HomePanel.prototype.uiend = function () {
        var _this = this;
        this.showinfo("HomePanel uiend");
        LoginManager_1.default.Instance.ensureAuthClient()
            .then(function () { return LoginManager_1.default.Instance.isAuthenticated(); })
            .then(function (authed) {
            if (authed) {
                _this.showinfo("HomePanel: Already authenticated");
                _this.handleLoginSuccess();
            }
            else {
                _this.showinfo("HomePanel: Not authenticated");
            }
        })
            .catch(function (e) {
            cc.error("HomePanel: BackManager init error:", e);
            _this.showinfo("Init Error: " + e);
        });
    };
    HomePanel.prototype.showinfo = function (strMsg) {
        cc.log("HomePanel: showinfo " + strMsg);
        UIManager_1.default.ShowTip(strMsg);
    };
    //login
    HomePanel.prototype.login = function () {
        var _this = this;
        LoginManager_1.default.Instance.login(function () { return _this.handleLoginSuccess(); }, function (e) { return _this.showinfo("Login Error: " + (e.message || e)); });
    };
    HomePanel.prototype.clickLogin = function (nTag) {
        this.showinfo("HomePanel clickLogin");
        cc.log("clickbegin" + nTag);
        //UIManager.Instance.OpenPanel(EUIPanelType.LOGIN);
        this.login();
    };
    HomePanel.prototype.handleLoginSuccess = function () {
        return __awaiter(this, void 0, void 0, function () {
            var principal;
            return __generator(this, function (_a) {
                principal = LoginManager_1.default.Instance.getPrincipalText();
                if (principal) {
                    this.showinfo("Login Success! Principal: " + principal);
                    this.labelpid.string = principal;
                }
                else {
                    this.showinfo("Login Success!");
                }
                UIManager_1.default.OpenPanel(CommonEnum_1.EUIPanelType.HOMELIST); //tables 列表
                return [2 /*return*/];
            });
        });
    };
    HomePanel.prototype.onGetAddressClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var principal, address, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        principal = LoginManager_1.default.Instance.getPrincipalText();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, BackManager_1.default.Instance.getEthAddress()];
                    case 2:
                        address = _a.sent();
                        this.showinfo('ETH Address: ' + address);
                        if (this.labelpid) {
                            this.labelpid.string = (principal || this.labelpid.string || '') + "\n" + address;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        cc.error('HomePanel: getEthAddress failed:', e_1);
                        this.showinfo('Fetch address failed: ' + e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        property(cc.Label)
    ], HomePanel.prototype, "labelpid", void 0);
    __decorate([
        property(cc.Sprite)
    ], HomePanel.prototype, "sprole", void 0);
    HomePanel = __decorate([
        ccclass
    ], HomePanel);
    return HomePanel;
}(UIPanel_1.default));
exports.default = HomePanel;

cc._RF.pop();