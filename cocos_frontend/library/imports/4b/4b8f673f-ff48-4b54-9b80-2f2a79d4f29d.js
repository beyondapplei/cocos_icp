"use strict";
cc._RF.push(module, '4b8f6c//0hLVJuALyp51PKd', 'BWBulletUnit');
// Script/ui/BWBulletUnit.ts

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
//import BWUnitManager from "./BWUnitManager";
var CommonEnum_1 = require("../CommonEnum");
var UIManager_1 = require("../UIManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BWBulletUnit = /** @class */ (function (_super) {
    __extends(BWBulletUnit, _super);
    function BWBulletUnit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BWBulletUnit.prototype.Init = function () {
        _super.prototype.Init.call(this);
        cc.log("BWEnemyUnit.Init");
        this.nSpeedY = 20;
        //this.rootNode.color = new cc.Color(255,0,0,255);
        function onLoadTexturebEnd(err, spriteFrame) {
            var sprite = this.rootNode.addComponent(cc.Sprite);
            sprite.spriteFrame = spriteFrame;
            sprite.type = cc.Sprite.Type.SIMPLE;
            sprite.sizeMode = cc.Sprite.SizeMode.RAW;
            //this.rootNode.setContentSize(80,80);
        }
        cc.loader.loadRes("texture/bullet", cc.SpriteFrame, onLoadTexturebEnd.bind(this));
    };
    BWBulletUnit.prototype.update = function (dt) {
        if (this.bDead) {
            return;
        }
        _super.prototype.update.call(this, dt);
        var gamePanel = UIManager_1.default.Instance.GetPanel(CommonEnum_1.EUIPanelType.GAME);
        if (gamePanel.InOutCameraTop(this)) {
            this.bDead = true;
            var BWUnitManager = require("./BWUnitManager").default;
            BWUnitManager.Instance.AddUnitToDelete(this);
        }
    };
    BWBulletUnit.prototype.OnDead = function () {
        _super.prototype.OnDead.call(this);
    };
    BWBulletUnit = __decorate([
        ccclass
    ], BWBulletUnit);
    return BWBulletUnit;
}(BWUnit_1.default));
exports.default = BWBulletUnit;

cc._RF.pop();