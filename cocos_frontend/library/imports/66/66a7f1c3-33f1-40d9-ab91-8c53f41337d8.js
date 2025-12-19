"use strict";
cc._RF.push(module, '66a7fHDM/FA2auRjFP0EzfY', 'ETHWalletPanel');
// Script/ui/wallet/ETHWalletPanel.ts

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
var UIPanel_1 = require("../UIPanel");
var ICPManager_1 = require("../../mg/ICPManager");
var LoginManager_1 = require("../../mg/LoginManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ETHWalletPanel = /** @class */ (function (_super) {
    __extends(ETHWalletPanel, _super);
    function ETHWalletPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ETHWalletPanel.prototype.onLoad = function () {
        this.nOrderState = 0;
        var btnNode = this.node.getChildByName('btnbegin');
        btnNode.on(cc.Node.EventType.TOUCH_END, this.clickBegin.bind(this, 109825), this);
        this.labelrec = this.node.getChildByName('labelrec').getComponent(cc.Label);
        this.labelbalance = this.node.getChildByName('labelbalance').getComponent(cc.Label);
        this.boxtoaddress = this.node.getChildByName('boxtoaddress').getComponent(cc.EditBox);
        this.boxamount = this.node.getChildByName('boxamount').getComponent(cc.EditBox);
        this.labelrec.string = "ICP Rec Address:\n" + "abcd-efgh-ijkl-mnop-qrst-uvwx-yz12-3456-7890";
        this.labelbalance.string = "Balance: 123.456 ICP";
    };
    ETHWalletPanel.prototype.start = function () {
    };
    ETHWalletPanel.prototype.RefreshUI = function () {
    };
    ETHWalletPanel.prototype.RefreshData = function () {
    };
    ETHWalletPanel.prototype.OnOpen = function (strParam) {
        var principalText = LoginManager_1.default.Instance.getPrincipalText();
        this.labelrec.string = principalText || "";
        this.labelbalance.string = "Balance: loading...";
        var strIcpLeagerCanisterId = "bw4dl-smaaa-aaaaa-qaacq-cai";
        var balanceText = ICPManager_1.default.Instance.GetBalance(principalText, strIcpLeagerCanisterId);
        this.labelbalance.string = balanceText;
    };
    ETHWalletPanel.prototype.OnClose = function () {
    };
    ETHWalletPanel.prototype.clickBegin = function (nTag) {
        cc.log('clickbegin' + nTag);
        //UIManager.Instance.OpenPanel(EUIPanelType.HOME);
    };
    ETHWalletPanel.prototype.clickOrder = function (nTag) {
    };
    ETHWalletPanel = __decorate([
        ccclass
    ], ETHWalletPanel);
    return ETHWalletPanel;
}(UIPanel_1.default));
exports.default = ETHWalletPanel;

cc._RF.pop();