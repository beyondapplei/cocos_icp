"use strict";
cc._RF.push(module, '3f670LRfklAo7mhch9xB/Wi', 'BWUnit');
// Script/ui/BWUnit.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BWUnit = /** @class */ (function () {
    function BWUnit() {
        this.nId = 0;
        this.nSpeedY = 0;
        this.bDead = false;
        this.nHp = 6;
    }
    BWUnit.prototype.Init = function () {
        cc.log("BWUnit.Init");
        this.rootNode = new cc.Node();
    };
    BWUnit.prototype.update = function (dt) {
        this.rootNode.y += this.nSpeedY;
    };
    BWUnit.prototype.OnDead = function () {
        this.rootNode.removeFromParent(true);
    };
    BWUnit.prototype.BeAttacked = function () { };
    BWUnit.prototype.Dead = function () { };
    BWUnit = __decorate([
        ccclass
    ], BWUnit);
    return BWUnit;
}());
exports.default = BWUnit;

cc._RF.pop();