"use strict";
cc._RF.push(module, '64e39OBuLdIarp5tWk6gqyc', 'UIManager');
// Script/UIManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResManager_1 = require("./ResManager");
//import LoginPanel from "./LoginPanel";
var UIManager = /** @class */ (function () {
    function UIManager() {
        this.mapUIPanel = {};
        this.mapScendName = {};
    }
    UIManager.OpenPanel = function (nPanelId, strParam) {
        UIManager.Instance.OpenPanel(nPanelId, strParam);
    };
    UIManager.ShowTip = function (strTip) {
        UIManager.Instance.showtip(strTip);
    };
    UIManager.prototype.onLoadEnd = function (err, res) {
        // for(let key in res.json){
        //     let nKey = parseInt(key);
        //     cc.log(key)
        //     this.mapScendName[nKey] = res.json[key];
        // }
        // cc.log('loadresendforfend')
        // for(let key in this.mapScendName){
        //     cc.log('www'+key+ this.mapScendName[key])
        // }
    };
    UIManager.prototype.Init = function (appRootNode) {
        this.appRootNode = appRootNode;
        this.createTipNode();
    };
    UIManager.prototype.loadPanel = function () {
    };
    UIManager.prototype.GetPanel = function (nPanelId) {
        return this.mapUIPanel[nPanelId];
    };
    UIManager.prototype.OpenPanel = function (nPanelId, strParam) {
        var uiPanelTab = ResManager_1.default.Instance.mapUIPanelTab[nPanelId];
        if (uiPanelTab.nRemove === 1) {
            this.appRootNode.removeAllChildren(false);
        }
        var panel = this.mapUIPanel[nPanelId];
        if (panel != null) {
            if (panel.node.parent === null) {
                this.appRootNode.addChild(panel.node);
            }
            panel.OnOpen(strParam);
            return;
        }
        function onLoadPrefabEnd(err, prefab) {
            var prefabNode = cc.instantiate(prefab);
            prefabNode.addComponent(cc.BlockInputEvents);
            var panel = prefabNode.addComponent(uiPanelTab.strName);
            this.appRootNode.addChild(panel.node);
            panel.OnOpen(strParam);
            this.mapUIPanel[nPanelId] = panel;
            //cc.Prefab
            //cc.loader.releaseAsset(prefab)
            cc.assetManager.releaseAsset(prefab);
        }
        //cc.loader.loadRes( uiPanelTab.strPrefabName, onLoadPrefabEnd.bind(this));
        //static loadRes(url: string, completeCallback: (error: Error, resource: any) => void): void;
        cc.resources.load(uiPanelTab.strPrefabName, onLoadPrefabEnd.bind(this));
    };
    UIManager.prototype.closePanel = function (nPanelId) {
        var panel = this.mapUIPanel[nPanelId];
        if (panel === null) {
            return;
        }
        panel.node.removeFromParent(false);
        panel.OnClose();
    };
    UIManager.prototype.loadScene = function (nType) {
        var strName = this.mapScendName[nType];
        if (strName === null) {
            return;
        }
        cc.director.loadScene(strName, this.onLoadSceneEnd.bind(this));
    };
    UIManager.prototype.onLoadSceneEnd = function () {
    };
    UIManager.prototype.createTipNode = function () {
        if (this.tipNode != null) {
            return;
        }
        function onLoadPrefabEnd(err, prefab) {
            this.tipNode = cc.instantiate(prefab);
            //this.tipNode.retain();
            //this.appRootNode.addChild(this.tipNode);
            //cc.Prefab
            //cc.loader.releaseAsset(prefab)
            cc.assetManager.releaseAsset(prefab);
        }
        //cc.loader.loadRes( "prefab/TipNode", onLoadPrefabEnd.bind(this));
        cc.resources.load("prefab/tippanel", onLoadPrefabEnd.bind(this));
    };
    UIManager.prototype.showtip = function (strTip) {
        cc.log('showtip=' + strTip);
        //const newTipNode: cc.Node = (cc as any).duplicate(this.tipNode);
        var newTipNode = cc.instantiate(this.tipNode);
        this.appRootNode.addChild(newTipNode);
        newTipNode.y = Math.random() * (500 - (-500)) + (-500);
        newTipNode.zIndex = 1000;
        var tippanel = newTipNode.addComponent("TipPanel");
        tippanel.showTip(strTip);
        //let tipComp = this.tipNode.getComponent('TipNode');
        //tipComp.showTip(strTip);
    };
    UIManager.Instance = new UIManager();
    return UIManager;
}());
exports.default = UIManager;

cc._RF.pop();