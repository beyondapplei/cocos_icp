"use strict";
cc._RF.push(module, '22437w0NOFFMqQSh9glMA1Q', 'ICPWalletPanel');
// Script/ui/wallet/ICPWalletPanel.ts

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
var UIManager_1 = require("../../UIManager");
var ICPManager_1 = require("../../mg/ICPManager");
var LoginManager_1 = require("../../mg/LoginManager");
var DefData_1 = require("../../mg/DefData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ICPWalletPanel = /** @class */ (function (_super) {
    __extends(ICPWalletPanel, _super);
    function ICPWalletPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ICPWalletPanel.prototype.onLoad = function () {
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
    ICPWalletPanel.prototype.start = function () {
    };
    ICPWalletPanel.prototype.RefreshUI = function () {
    };
    ICPWalletPanel.prototype.RefreshData = function () {
    };
    ICPWalletPanel.prototype.OnOpen = function (strParam) {
        var _this = this;
        var principalText = LoginManager_1.default.Instance.getPrincipalText();
        this.labelrec.string = principalText || "";
        this.labelbalance.string = "Balance: loading...";
        var strIcpLeagerCanisterId = DefData_1.LEAGER_ICP_ID_LOCAL;
        ICPManager_1.default.Instance.GetBalance(principalText, strIcpLeagerCanisterId)
            .then(function (balanceText) {
            _this.labelbalance.string = balanceText;
        })
            .catch(function (e) {
            cc.error('ICPWalletPanel: GetBalance failed:', e);
            _this.labelbalance.string = 'Balance: error';
        });
    };
    ICPWalletPanel.prototype.OnClose = function () {
    };
    ICPWalletPanel.prototype.clickBegin = function (nTag) {
        var _this = this;
        cc.log('clickbegin' + nTag);
        //UIManager.Instance.OpenPanel(EUIPanelType.HOME);
        //发送icp
        var toText = (this.boxtoaddress && this.boxtoaddress.string) ? this.boxtoaddress.string.trim() : '';
        var amountText = (this.boxamount && this.boxamount.string) ? this.boxamount.string.trim() : '';
        if (!toText || !amountText) {
            UIManager_1.default.ShowTip('请输入收款地址和金额');
            return;
        }
        var strIcpLeagerCanisterId = DefData_1.LEAGER_ICP_ID_LOCAL;
        UIManager_1.default.ShowTip('Sending ICP...');
        ICPManager_1.default.Instance.SendICP(toText, amountText, strIcpLeagerCanisterId)
            .then(function (msg) {
            UIManager_1.default.ShowTip(msg);
            var principalText = LoginManager_1.default.Instance.getPrincipalText();
            return ICPManager_1.default.Instance.GetBalance(principalText, strIcpLeagerCanisterId);
        })
            .then(function (balanceText) {
            _this.labelbalance.string = balanceText;
        })
            .catch(function (e) {
            cc.error('ICPWalletPanel: SendICP failed:', e);
            UIManager_1.default.ShowTip('发送失败: ' + (e && e.message ? e.message : e));
        });
    };
    ICPWalletPanel.prototype.clickOrder = function (nTag) {
    };
    ICPWalletPanel = __decorate([
        ccclass
    ], ICPWalletPanel);
    return ICPWalletPanel;
}(UIPanel_1.default));
exports.default = ICPWalletPanel;

cc._RF.pop();