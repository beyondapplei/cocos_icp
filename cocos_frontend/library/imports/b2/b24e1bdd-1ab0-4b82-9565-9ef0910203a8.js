"use strict";
cc._RF.push(module, 'b24e1vdGrBLgpVlnvCRAgOo', 'LoginPanel');
// Script/ui/LoginPanel.ts

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
//coin list panel = LoginPanel.ts
//import { _decorator, Component, Label, Asset, assert, loader, sys, assetManager } from 'cc';
//mport { _decorator, Component } from 'cc';
//const { ccclass, property } = _decorator;
var MyCellData = /** @class */ (function (_super) {
    __extends(MyCellData, _super);
    function MyCellData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyCellData.prototype.init = function (node) {
        //this.nOrderState = 0;
        //super.init();
        this.node = node;
        this.labName = this.node.getChildByName('labelname').getComponent(cc.Label);
        this.labPriceLow = this.node.getChildByName('labelpricelow').getComponent(cc.Label);
        this.labPriceHi = this.node.getChildByName('labelpricecur').getComponent(cc.Label);
        this.labPriceScale = this.node.getChildByName('labelpricescale').getComponent(cc.Label);
        this.labCap = this.node.getChildByName('labelcap').getComponent(cc.Label);
        this.btnIcon = this.node.getChildByName('btnIcon').getComponent(cc.Button);
        this.nOldBgHeight = this.node.height;
    };
    MyCellData.prototype.refreshUI = function (info) {
        var mapCoinTab = ResManager_1.default.Instance.mapCoinTab;
        var tabInfo = mapCoinTab[info.nId];
        this.labName.string = tabInfo.strSymbol;
        this.labPriceLow.string = tabInfo.nPriceLow.toString(); //nPriceLow
        var nPriCur = info.nPriceHi.toFixed(3);
        this.labPriceHi.string = nPriCur; //info.nPriceHi.toString();//nPriceLow
        var nScale = info.nPriceHi / tabInfo.nPriceLow;
        var strScale = nScale.toFixed(3);
        this.labPriceScale.string = strScale; //nScale.toString();
        this.labCap.string = info.nMC.toFixed(3); //info.nMC.toString();
    };
    return MyCellData;
}(TableView_1.CellData));
//-===========================================
var CoinData = /** @class */ (function () {
    function CoinData() {
    }
    return CoinData;
}());
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LoginPanel = /** @class */ (function (_super) {
    __extends(LoginPanel, _super);
    function LoginPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.vCoinData = [];
        return _this;
    }
    LoginPanel.prototype.onLoad = function () {
        this.nOrderState = 0;
        this.nIndexReq = 0;
        var btnBeginNode = this.node.getChildByName('btnback');
        btnBeginNode.on(cc.Node.EventType.TOUCH_END, this.clickBegin.bind(this, 109825), this);
        var btnOrder = this.node.getChildByName('btnorder');
        btnOrder.on(cc.Node.EventType.TOUCH_END, this.clickOrder.bind(this, 1025), this);
        this.tableview = this.node.getChildByName('tableview').getComponent(TableView_1.TableView);
        this.tableview.setRefreshCellCallBack(this, this.refreshCell, this.getCellHeight);
        this.tableview.nodeElement.active = false;
    };
    LoginPanel.prototype.start = function () {
    };
    LoginPanel.prototype.RefreshUI = function () {
        this.tableview.reloadData(this.vCoinData.length);
    };
    LoginPanel.prototype.UpdateCurPrice = function (strSymbol, nPriceCur) {
        var mapCoinTab = ResManager_1.default.Instance.mapCoinTab;
        for (var k in this.vCoinData) {
            var cellData = this.vCoinData[k];
            if (mapCoinTab[cellData.nId].strSymbol == strSymbol) {
                this.vCoinData[k].nPriceHi = nPriceCur;
                this.vCoinData[k].nMC = nPriceCur * mapCoinTab[cellData.nId].nCount * 7.2;
                this.vCoinData[k].nScale = nPriceCur / mapCoinTab[cellData.nId].nPriceLow;
                break;
            }
        }
    };
    LoginPanel.prototype.OnResult = function (strResponseText) {
        cc.log("OnResult");
        cc.log(strResponseText);
        var jsObj = JSON.parse(strResponseText);
        var nPriceCur = jsObj["result"]["rate"];
        var strSymbol = jsObj["result"]["asset_id_base"];
        this.UpdateCurPrice(strSymbol, nPriceCur);
    };
    LoginPanel.prototype.sendXHR = function (strCoin) {
        var xhr = new XMLHttpRequest();
        var selfObj = this;
        var OnResultLocal = function () {
            if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 400) {
                // let aastring = handler(xhr.responseText);
                var response = xhr.responseText;
                selfObj.OnResult(xhr.responseText);
            }
            else if (xhr.status === 404) {
                cc.log('404 page not found!');
            }
            else if (xhr.readyState === 3) {
                cc.log('Request dealing!');
            }
            else if (xhr.readyState === 2) {
                cc.log('Request received!');
            }
            else if (xhr.readyState === 1) {
                cc.log('Server connection established! Request hasn\'t been received');
            }
            else if (xhr.readyState === 0) {
                cc.log('Request hasn\'t been initiated!');
            }
        };
        xhr.onreadystatechange = OnResultLocal;
        var strIp = "https://rest.coinapi.io/jsonrpc/";
        var mapData = {};
        mapData["method"] = "v1/exchangerate/" + strCoin + "/usdt";
        // let filterOne: {[key: string]: string} = {};
        // filterOne["filter_asset_id"] = strCoin
        // let vSymbol = []
        // vSymbol.push(filterOne)
        // mapData["params"] = vSymbol
        var mapBody = JSON.stringify(mapData);
        xhr.open('POST', strIp, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader("Accept", "text/plain");
        xhr.setRequestHeader("X-CoinAPI-Key", "6CC2846F-2739-4DD5-A3CF-9361997D87CA");
        xhr.timeout = 10000; // 10 seconds for timeout
        xhr.send(mapBody);
    };
    LoginPanel.prototype.NextReqPrice = function () {
        this.RefreshUI();
        cc.log("nIndexReq=" + this.nIndexReq);
        if (this.nIndexReq >= this.vCoinData.length) {
            return;
        }
        this.ReqPriceOne();
        this.nIndexReq++;
        var selfObj = this;
        var OnResultLocal = function () {
            selfObj.NextReqPrice();
        };
        this.scheduleOnce(OnResultLocal, 0.5);
    };
    LoginPanel.prototype.ReqPriceOne = function () {
        var nId = this.vCoinData[this.nIndexReq].nId;
        var mapCoinTab = ResManager_1.default.Instance.mapCoinTab;
        var strSymbol = mapCoinTab[nId].strSymbol;
        this.sendXHR(strSymbol);
        // for(let k in mapCoinTab)
        // {
        //     let mapCoinTab = ResManager.Instance.mapCoinTab
        //     let strSymbol = mapCoinTab[k].strSymbol
        //     this.sendXHR(strSymbol)
        // }
    };
    LoginPanel.prototype.RefreshData = function () {
        this.nIndexReq = 0;
        this.vCoinData = [];
        var mapCoinTab = ResManager_1.default.Instance.mapCoinTab;
        for (var k in mapCoinTab) {
            var cellInfo = new CoinData();
            cellInfo.nId = mapCoinTab[k].nId;
            cellInfo.nPriceHi = 100000;
            cellInfo.nMC = cellInfo.nPriceHi * mapCoinTab[k].nCount;
            cellInfo.nScale = cellInfo.nPriceHi / mapCoinTab[k].nPriceLow;
            this.vCoinData.push(cellInfo);
        }
        this.NextReqPrice();
    };
    LoginPanel.prototype.OnOpen = function (strParam) {
        this.RefreshData();
        //this.RefreshUI()
    };
    LoginPanel.prototype.OnClose = function () {
    };
    LoginPanel.prototype.getCellHeight = function (nIndex) {
        return 50;
    };
    LoginPanel.prototype.refreshCell = function (nIndex) {
        var cellData = this.tableview.dequeueCell();
        if (cellData === null) {
            cellData = new MyCellData();
            var node = this.tableview.createElementNode();
            node.active = true;
            cellData.init(node);
            cellData.btnIcon.node.on(cc.Node.EventType.TOUCH_END, this.clickCell.bind(this, cellData.btnIcon), this);
        }
        cc.log('refreshCell' + nIndex);
        var cellInfo = this.vCoinData[nIndex];
        cellData.refreshUI(cellInfo);
        cellData.btnIcon.nTag = nIndex;
        return cellData;
    };
    LoginPanel.prototype.clickCell = function (btnIcon) {
        var nIndex = btnIcon.nTag;
        cc.log('clickcell=' + nIndex);
        var nId = this.vCoinData[nIndex].nId;
        if (nId === 1) {
        }
        else if (nId === 2) {
            UIManager_1.default.Instance.OpenPanel(CommonEnum_1.EUIPanelType.GAME);
        }
    };
    LoginPanel.prototype.clickBegin = function (nTag) {
        cc.log('clickbegin' + nTag);
        UIManager_1.default.Instance.OpenPanel(CommonEnum_1.EUIPanelType.HOME);
    };
    LoginPanel.prototype.clickOrder = function (nTag) {
        cc.log('clickOrder' + nTag);
        if (this.nOrderState == 0) {
            this.nOrderState = 1;
            this.vCoinData.sort(function (v1, v2) {
                return v2.nScale - v1.nScale;
            });
        }
        else {
            this.nOrderState = 0;
            this.vCoinData.sort(function (v1, v2) {
                return v2.nMC - v1.nMC;
            });
        }
        this.RefreshUI();
    };
    LoginPanel = __decorate([
        ccclass
    ], LoginPanel);
    return LoginPanel;
}(UIPanel_1.default));
exports.default = LoginPanel;

cc._RF.pop();