"use strict";
cc._RF.push(module, 'a64f9K0U81B8qjUJpJGHMKl', 'BWEnemyUnit');
// Script/ui/BWEnemyUnit.ts

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
var BWUnit_1 = require("./BWUnit");
var UIManager_1 = require("../UIManager");
//import BWUnitManager from "./BWUnitManager";
var CommonEnum_1 = require("../CommonEnum");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BWEnemyUnit = /** @class */ (function (_super) {
    __extends(BWEnemyUnit, _super);
    function BWEnemyUnit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BWEnemyUnit.prototype.Init = function () {
        _super.prototype.Init.call(this);
        this.nHp = 6;
        this.nSpeedY = -(Math.random() * 15 + 1);
        cc.log("BWEnemyUnit.Init");
        function onLoadTexturebEnd(err, spriteFrame) {
            var sprite = this.rootNode.addComponent(cc.Sprite);
            sprite.spriteFrame = spriteFrame;
            sprite.type = cc.Sprite.Type.SIMPLE;
            sprite.sizeMode = cc.Sprite.SizeMode.RAW;
        }
        var nNum = Math.round(Math.random() * 2) + 1;
        var strEnemyName = "enemy" + nNum;
        cc.log(strEnemyName);
        cc.loader.loadRes("texture/" + strEnemyName, cc.SpriteFrame, onLoadTexturebEnd.bind(this));
        var labNode = new cc.Node();
        this.labelNum = labNode.addComponent(cc.Label);
        this.labelNum.node.color = cc.Color.RED;
        labNode.parent = this.rootNode;
    };
    BWEnemyUnit.prototype.update = function (dt) {
        if (this.bDead) {
            return;
        }
        _super.prototype.update.call(this, dt);
        var gamePanel = UIManager_1.default.Instance.GetPanel(CommonEnum_1.EUIPanelType.GAME);
        if (gamePanel.InOutCameraBottom(this)) {
            this.bDead = true;
            var BWUnitManager = require("./BWUnitManager").default;
            BWUnitManager.Instance.AddUnitToDelete(this);
        }
    };
    BWEnemyUnit.prototype.OnDead = function () {
        _super.prototype.OnDead.call(this);
    };
    BWEnemyUnit.prototype.BeAttacked = function () {
        if (this.bDead) {
            return;
        }
        this.nHp--;
        if (this.nHp <= 0) {
            this.Dead();
        }
        this.labelNum.string = this.nHp.toString();
    };
    BWEnemyUnit.prototype.Dead = function () {
        if (this.bDead) {
            return;
        }
        this.bDead = true;
        this.labelNum.string = "";
        var BWUnitManager = require("./BWUnitManager").default;
        BWUnitManager.Instance.AddScore();
        BWUnitManager.Instance.AddUnitToDelete(this);
    };
    BWEnemyUnit = __decorate([
        ccclass
    ], BWEnemyUnit);
    return BWEnemyUnit;
}(BWUnit_1.default));
exports.default = BWEnemyUnit;

cc._RF.pop();