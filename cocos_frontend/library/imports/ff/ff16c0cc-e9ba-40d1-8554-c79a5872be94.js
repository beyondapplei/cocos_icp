"use strict";
cc._RF.push(module, 'ff16cDM6bpA0YVUx5pYcr6U', 'GameApp');
// Script/ui/GameApp.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var UIManager_1 = require("../UIManager");
var ResManager_1 = require("../ResManager");
var EventManager_1 = require("../EventManager");
var BWUnitManager_1 = require("../BWUnitManager");
var WangbinTest_1 = require("../WangbinTest");
var CommonEnum_1 = require("../CommonEnum");
var AppkManager_1 = require("../mg/AppkManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameApp = /** @class */ (function (_super) {
    __extends(GameApp, _super);
    function GameApp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.btnBegin = null;
        //@property(cc.Sprite)
        //spriteAd: cc.Sprite = null;
        //cdcd:number;
        _this.scrollViewA = null;
        _this.text = 'wangbin,123,ujh';
        return _this;
    }
    GameApp.prototype.gameInit = function () {
        ResManager_1.default.Instance.Init();
        var uirootnode = this.node.getChildByName('uirootnode');
        UIManager_1.default.Instance.Init(uirootnode);
        EventManager_1.default.Instance.Init();
        AppkManager_1.default.Instance.Init();
        //BWUnitManager.Instance.Init();
    };
    GameApp.prototype.onLoad = function () {
        cc.loader.loadRes("texture/head1", cc.SpriteFrame);
        this.node.addComponent(WangbinTest_1.default);
        cc.log('wangbin onLoa1 ');
        this.gameInit();
        this.mainCamera = this.node.getChildByName('Main Camera').getComponent(cc.Camera);
        //EventManager.Instance.AddEvent(ECMDID.LOGIN, this, this.testCallback);
        //EventManager.Instance.RemoveEvent(ECMDID.LOGIN, this, this.start)
        //EventManager.Instance.FireEvent(ECMDID.LOGIN, 'wangbin');
        var btnBeginNode = this.node.getChildByName('btnbegin');
        // this.btnBegin.node.on(cc.Node.EventType.TOUCH_START, function (event) {
        //     console.log("TOUCH_START")
        // });
        // this.btnBegin.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
        //     console.log("TOUCH_MOVE")
        // });
        btnBeginNode.on(cc.Node.EventType.TOUCH_END, this.clickBegin.bind(this, 125), this);
        //let nodeLogo = this.node.getChildByName('background');
        //let actionScale = cc.scaleTo(2,1);
        //UIManager.Instance.OpenPanel(EUIPanelType.HOME);
    };
    GameApp.prototype.clickBegin = function (nTag) {
        cc.log('gameapp clickbegin' + nTag);
        cc.log(this.text + '=beginclickthis');
        UIManager_1.default.Instance.OpenPanel(CommonEnum_1.EUIPanelType.HOME); //tables 列表
    };
    GameApp.prototype.onDestroy = function () {
        //EventManager.Instance.RemoveEvent(ECMDID.LOGIN, this, this.testCallback)
    };
    GameApp.prototype.testCallback = function (strParam) {
        cc.log(strParam);
    };
    GameApp.prototype.start = function () {
        // init logic
        // if (cc.sys.browserType === cc.sys.BROWSER_TYPE_WECHAT_GAME_SUB) {
        //require('./libs/sub-context-adapter');
        // }
    };
    GameApp.prototype.testFun = function () {
        cc.log('testfun');
    };
    GameApp.prototype.update = function (dt) {
        //cc.log("gameapp=dt="+dt);
        BWUnitManager_1.default.Instance.update(dt);
    };
    GameApp.prototype.lateUpdate = function () {
    };
    __decorate([
        property(cc.Label)
    ], GameApp.prototype, "label", void 0);
    __decorate([
        property(cc.Button)
    ], GameApp.prototype, "btnBegin", void 0);
    __decorate([
        property(cc.ScrollView)
    ], GameApp.prototype, "scrollViewA", void 0);
    __decorate([
        property
    ], GameApp.prototype, "text", void 0);
    GameApp = __decorate([
        ccclass
    ], GameApp);
    return GameApp;
}(cc.Component));
exports.default = GameApp;

cc._RF.pop();