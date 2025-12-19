"use strict";
cc._RF.push(module, 'c9e70PZVA9MsZG5RJqQZX+p', 'GameEndPanel');
// Script/ui/GameEndPanel.ts

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
var UIPanel_1 = require("./UIPanel");
var UIManager_1 = require("../UIManager");
var CommonEnum_1 = require("../CommonEnum");
var BWUnitManager_1 = require("../BWUnitManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameEndPanel = /** @class */ (function (_super) {
    __extends(GameEndPanel, _super);
    function GameEndPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameEndPanel.prototype.onLoad = function () {
        var btnBeginNode = this.node.getChildByName('btnbegin');
        btnBeginNode.on(cc.Node.EventType.TOUCH_END, this.clickBegin.bind(this, 109825), this);
        this.labelScore = this.node.getChildByName("scoretitle").getChildByName("score").getComponent(cc.Label);
    };
    GameEndPanel.prototype.start = function () {
    };
    GameEndPanel.prototype.OnOpen = function (strParam) {
        var nScore = BWUnitManager_1.default.Instance.nScore;
        this.labelScore.string = nScore.toString();
    };
    GameEndPanel.prototype.onClose = function () {
    };
    GameEndPanel.prototype.clickBegin = function (nTag) {
        cc.log('clickbegin' + nTag);
        BWUnitManager_1.default.Instance.DeleteAllUnit();
        //UIManager.Instance.OpenPanel(EUIPanelType.HOME);
        //UIManager.Instance.closePanel(EUIPanelType.GAMEEND);
        //UIManager.Instance.closePanel(EUIPanelType.GAME);
        UIManager_1.default.Instance.OpenPanel(CommonEnum_1.EUIPanelType.LOGIN);
    };
    GameEndPanel = __decorate([
        ccclass
    ], GameEndPanel);
    return GameEndPanel;
}(UIPanel_1.default));
exports.default = GameEndPanel;

cc._RF.pop();