"use strict";
cc._RF.push(module, 'dab714/MY5MXYe4gJISUlol', 'BWPlayerUnit');
// Script/ui/BWPlayerUnit.ts

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
var EventManager_1 = require("../EventManager");
var CommonEnum_1 = require("../CommonEnum");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BWPlayerUnit = /** @class */ (function (_super) {
    __extends(BWPlayerUnit, _super);
    function BWPlayerUnit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nCreateBulletCd = 0.1;
        _this.nCreateBulletCdDt = 0;
        return _this;
    }
    BWPlayerUnit.prototype.Init = function () {
        _super.prototype.Init.call(this);
        this.nHp = 3;
        cc.log("BWPlayerUnit.Init");
        this.nSpeedY = 1;
        function onLoadTexturebEnd(err, spriteFrame) {
            var sprite = this.rootNode.addComponent(cc.Sprite);
            sprite.spriteFrame = spriteFrame;
            sprite.type = cc.Sprite.Type.SIMPLE;
            sprite.sizeMode = cc.Sprite.SizeMode.RAW;
            //this.rootNode.setContentSize(80,80);
        }
        cc.loader.loadRes("texture/plane", cc.SpriteFrame, onLoadTexturebEnd.bind(this));
    };
    BWPlayerUnit.prototype.update = function (dt) {
        if (this.bDead) {
            return;
        }
        _super.prototype.update.call(this, dt);
        this.nCreateBulletCdDt += dt;
        if (this.nCreateBulletCdDt > this.nCreateBulletCd) {
            //BWUnitManager.Instance.CreateBullet();
            EventManager_1.default.Instance.FireEvent(CommonEnum_1.ECMDID.CREATEBULLET);
            this.nCreateBulletCdDt = 0;
        }
    };
    BWPlayerUnit.prototype.OnDead = function () {
        _super.prototype.OnDead.call(this);
    };
    BWPlayerUnit.prototype.BeAttacked = function () {
        if (this.bDead) {
            return;
        }
        this.nHp--;
        EventManager_1.default.Instance.FireEvent(CommonEnum_1.ECMDID.REFRESHPLAYERHP);
        if (this.nHp <= 0) {
            this.bDead = true;
            var BWUnitManager = require("./BWUnitManager").default;
            BWUnitManager.Instance.GameOver();
        }
        //this.labelNum.string = this.nHp.toString();
    };
    BWPlayerUnit = __decorate([
        ccclass
    ], BWPlayerUnit);
    return BWPlayerUnit;
}(BWUnit_1.default));
exports.default = BWPlayerUnit;

cc._RF.pop();