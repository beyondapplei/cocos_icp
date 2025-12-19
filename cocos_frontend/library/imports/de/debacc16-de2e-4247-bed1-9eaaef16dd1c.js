"use strict";
cc._RF.push(module, 'debacwW3i5CR77RnqrvFt0c', 'GamePanel');
// Script/ui/GamePanel.ts

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
var EventManager_1 = require("../EventManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GamePanel = /** @class */ (function (_super) {
    __extends(GamePanel, _super);
    function GamePanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //onload->start->onopen
        _this.nCreateEnemyCd = 0.4;
        _this.nCreateEnemyCdDt = 0;
        return _this;
    }
    GamePanel.prototype.onLoad = function () {
        var btnBeginNode = this.node.getChildByName('btnbegin');
        btnBeginNode.on(cc.Node.EventType.TOUCH_END, this.clickBegin.bind(this, 109825), this);
        this.battleNode = this.node.getChildByName('battlenode');
        this.battleCamera = this.battleNode.getChildByName("battlecamera").getComponent(cc.Camera);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove.bind(this), this);
        this.labelScore = this.node.getChildByName("playerhp").getComponent(cc.Label);
        this.labelPlayerHp = this.node.getChildByName("score").getComponent(cc.Label);
    };
    GamePanel.prototype.start = function () { };
    GamePanel.prototype.update = function (dt) {
        //cc.log("GamePanel"+dt);
        this.nCreateEnemyCdDt += dt;
        if (this.nCreateEnemyCdDt > this.nCreateEnemyCd) {
            this.CreateEnemyUnit();
            this.nCreateEnemyCdDt = 0;
        }
        var nScore = BWUnitManager_1.default.Instance.nScore;
        var fPercent = nScore / 200;
        if (fPercent > 1) {
            fPercent = 1;
        }
        this.nCreateEnemyCd = 0.4 - (fPercent) * 0.3;
    };
    GamePanel.prototype.lateUpdate = function () {
        this.battleCamera.node.y += this.playerMe.nSpeedY;
    };
    GamePanel.prototype.RefreshPlayerHp = function () {
        var nPlayerHp = BWUnitManager_1.default.Instance.playerMe.nHp;
        this.labelPlayerHp.string = nPlayerHp.toString();
    };
    GamePanel.prototype.RefreshScore = function () {
        var nScore = BWUnitManager_1.default.Instance.nScore;
        this.labelScore.string = nScore.toString();
    };
    GamePanel.prototype.EventOpt = function (bAdd) {
        var optFun = null;
        if (bAdd) {
            EventManager_1.default.Instance.AddEvent(CommonEnum_1.ECMDID.CREATEBULLET, this, this.CreateButtle);
            EventManager_1.default.Instance.AddEvent(CommonEnum_1.ECMDID.REFRESHPLAYERHP, this, this.RefreshPlayerHp);
            EventManager_1.default.Instance.AddEvent(CommonEnum_1.ECMDID.REFRESHSCORE, this, this.RefreshScore);
        }
        else {
            EventManager_1.default.Instance.RemoveEvent(CommonEnum_1.ECMDID.CREATEBULLET, this, this.CreateButtle);
            EventManager_1.default.Instance.RemoveEvent(CommonEnum_1.ECMDID.REFRESHPLAYERHP, this, this.RefreshPlayerHp);
            EventManager_1.default.Instance.RemoveEvent(CommonEnum_1.ECMDID.REFRESHSCORE, this, this.RefreshScore);
        }
    };
    GamePanel.prototype.OnOpen = function (strParam) {
        this.EventOpt(true);
        this.InitPlayer();
        this.labelPlayerHp.string = "3";
        this.labelScore.string = "0";
        BWUnitManager_1.default.Instance.SetGameBegin(true);
    };
    GamePanel.prototype.onClose = function () {
        this.EventOpt(false);
    };
    //--------
    GamePanel.prototype.InitPlayer = function () {
        this.playerMe = BWUnitManager_1.default.Instance.CreatePlayer();
        this.playerMe.rootNode.position = new cc.Vec3(100, 100, 0);
        this.AddUnitToNode(this.playerMe);
        this.CreateEnemyUnit();
        //let bBox = this.playerMe.rootNode.getBoundingBox(); //Rect
    };
    GamePanel.prototype.CreateButtle = function () {
        var unit = BWUnitManager_1.default.Instance.CreateBullet();
        var nPosX = this.playerMe.rootNode.x;
        var nPosY = this.playerMe.rootNode.y + 50;
        unit.rootNode.position = new cc.Vec3(nPosX, nPosY, 0);
        this.AddUnitToNode(unit);
    };
    GamePanel.prototype.CreateEnemyUnit = function () {
        var nR = Math.random();
        //cc.log("nrrrr="+nR);
        var enemy = BWUnitManager_1.default.Instance.CreateEnemy();
        var nPosX = Math.random() * 640;
        var nPosY = Math.random() * 960 + this.battleCamera.node.y + this.battleNode.height;
        enemy.rootNode.position = new cc.Vec3(nPosX, nPosY, 0);
        this.AddUnitToNode(enemy);
    };
    GamePanel.prototype.touchMove = function (e) {
        cc.log("cc.Node.EventType.TOUCH_MOVE");
        var move_x = e.touch._point.x - e.touch._prevPoint.x;
        var move_y = e.touch._point.y - e.touch._prevPoint.y;
        this.playerMe.rootNode.x = this.playerMe.rootNode.x + move_x;
        this.playerMe.rootNode.y = this.playerMe.rootNode.y + move_y;
        if (this.playerMe.rootNode.x < 0) {
            this.playerMe.rootNode.x = 0;
        }
        if (this.playerMe.rootNode.x > this.battleNode.width) {
            this.playerMe.rootNode.x = this.battleNode.width;
        }
        if (this.playerMe.rootNode.y < this.battleCamera.node.y - this.battleNode.height * 0.5) {
            this.playerMe.rootNode.y = this.battleCamera.node.y - this.battleNode.height * 0.5;
        }
        if (this.playerMe.rootNode.y > this.battleCamera.node.y + this.battleNode.height * 0.5) {
            this.playerMe.rootNode.y = this.battleCamera.node.y + this.battleNode.height * 0.5;
        }
    };
    GamePanel.prototype.InOutCameraBottom = function (unit) {
        if (unit.rootNode.y < this.battleCamera.node.y - this.battleNode.height * 0.5) {
            return true;
        }
        return false;
    };
    GamePanel.prototype.InOutCameraTop = function (unit) {
        if (unit.rootNode.y > this.battleCamera.node.y + this.battleNode.height * 0.5) {
            return true;
        }
        return false;
    };
    GamePanel.prototype.AddUnitToNode = function (unitNode) {
        this.battleNode.addChild(unitNode.rootNode);
    };
    GamePanel.prototype.clickBegin = function (nTag) {
        cc.log('clickbegin' + nTag);
        BWUnitManager_1.default.Instance.DeleteAllUnit();
        BWUnitManager_1.default.Instance.SetGameBegin(false);
        UIManager_1.default.Instance.closePanel(CommonEnum_1.EUIPanelType.GAME);
    };
    GamePanel = __decorate([
        ccclass
    ], GamePanel);
    return GamePanel;
}(UIPanel_1.default));
exports.default = GamePanel;

cc._RF.pop();