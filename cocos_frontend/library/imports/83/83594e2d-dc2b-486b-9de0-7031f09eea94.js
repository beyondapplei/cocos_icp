"use strict";
cc._RF.push(module, '835944t3CtIa53gcDHwnuqU', 'HomeListPanel');
// Script/ui/HomeListPanel.ts

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
var TableView_1 = require("./TableView");
var ResManager_1 = require("../ResManager");
var HomeListData = /** @class */ (function (_super) {
    __extends(HomeListData, _super);
    function HomeListData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HomeListData.prototype.init = function (node) {
        //this.nOrderState = 0;
        //super.init();
        this.node = node;
        this.btnIcon = this.node.getChildByName('btnicon').getComponent(cc.Button);
        this.labName = this.btnIcon.node.getChildByName('labelname').getComponent(cc.Label);
        //this.labPriceLow = this.node.getChildByName('labelpricelow').getComponent(cc.Label);
        //this.labPriceHi = this.node.getChildByName('labelpricecur').getComponent(cc.Label);
        //this.labPriceScale = this.node.getChildByName('labelpricescale').getComponent(cc.Label);
        this.labCap = this.btnIcon.node.getChildByName('labelcap').getComponent(cc.Label);
        this.nOldBgHeight = this.node.height;
    };
    HomeListData.prototype.refreshUI = function (info) {
        this.labName.string = info.nId.toString(); //sName
        this.labCap.string = info.sName;
    };
    return HomeListData;
}(TableView_1.CellData));
//-===========================================
var ListCellData = /** @class */ (function () {
    function ListCellData() {
    }
    return ListCellData;
}());
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HomeListPanel = /** @class */ (function (_super) {
    __extends(HomeListPanel, _super);
    function HomeListPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.vListData = [];
        return _this;
    }
    HomeListPanel.prototype.onLoad = function () {
        this.nOrderState = 0;
        this.nIndexReq = 0;
        // let btnBeginNode = this.node.getChildByName('btnback');
        // btnBeginNode.on(cc.Node.EventType.TOUCH_END, this.clickBegin.bind(this,109825),this);
        // let btnOrder = this.node.getChildByName('btnorder');
        // btnOrder.on(cc.Node.EventType.TOUCH_END, this.clickOrder.bind(this,1025),this);
        this.tableview = this.node.getChildByName('tableview').getComponent(TableView_1.TableView);
        this.tableview.setRefreshCellCallBack(this, this.refreshCell, this.getCellHeight);
        this.tableview.nodeElement.active = false;
    };
    HomeListPanel.prototype.start = function () {
    };
    HomeListPanel.prototype.RefreshUI = function () {
        this.tableview.reloadData(this.vListData.length);
    };
    HomeListPanel.prototype.UpdateCurPrice = function (strSymbol, nPriceCur) {
        var mapCoinTab = ResManager_1.default.Instance.mapCoinTab;
    };
    HomeListPanel.prototype.OnResult = function (strResponseText) {
        cc.log("OnResult");
        cc.log(strResponseText);
        var jsObj = JSON.parse(strResponseText);
        var nPriceCur = jsObj["result"]["rate"];
        var strSymbol = jsObj["result"]["asset_id_base"];
        this.UpdateCurPrice(strSymbol, nPriceCur);
    };
    HomeListPanel.prototype.RefreshData = function () {
        this.nIndexReq = 0;
        this.vListData = [];
        //for(nindex)
        //写个循环创建20个数据
        for (var i = 1; i <= 20; i++) {
            var cellInfo = new ListCellData();
            cellInfo.nId = i;
            cellInfo.sName = "wallet" + i;
            this.vListData.push(cellInfo);
        }
    };
    HomeListPanel.prototype.OnOpen = function (strParam) {
        this.RefreshData();
        this.RefreshUI();
    };
    HomeListPanel.prototype.OnClose = function () {
    };
    HomeListPanel.prototype.getCellHeight = function (nIndex) {
        return 200;
    };
    HomeListPanel.prototype.refreshCell = function (nIndex) {
        var cellData = this.tableview.dequeueCell();
        if (cellData === null) {
            cellData = new HomeListData();
            var node = this.tableview.createElementNode();
            node.active = true;
            cellData.init(node);
            cellData.btnIcon.node.on(cc.Node.EventType.TOUCH_END, this.clickCell.bind(this, cellData.btnIcon), this);
        }
        cc.log('refreshCell' + nIndex);
        var cellInfo = this.vListData[nIndex];
        cellData.refreshUI(cellInfo);
        cellData.btnIcon.nTag = nIndex;
        return cellData;
    };
    HomeListPanel.prototype.clickCell = function (btnIcon) {
        var nIndex = btnIcon.nTag;
        cc.log('clickcell=' + nIndex);
        var nId = this.vListData[nIndex].nId;
        if (nId === 1) {
        }
        else if (nId === 2) {
            // UIManager.Instance.OpenPanel(EUIPanelType.GAME);
        }
        UIManager_1.default.OpenPanel(CommonEnum_1.EUIPanelType.WALLET);
    };
    HomeListPanel.prototype.clickBegin = function (nTag) {
        cc.log('clickbegin' + nTag);
        //UIManager.Instance.OpenPanel(EUIPanelType.HOME);
    };
    HomeListPanel.prototype.clickOrder = function (nTag) {
    };
    HomeListPanel = __decorate([
        ccclass
    ], HomeListPanel);
    return HomeListPanel;
}(UIPanel_1.default));
exports.default = HomeListPanel;

cc._RF.pop();