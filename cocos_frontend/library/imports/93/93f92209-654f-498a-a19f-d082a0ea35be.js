"use strict";
cc._RF.push(module, '93f92IJZU9JiqGf0IKg6jW+', 'WangbinTest');
// Script/WangbinTest.ts

"use strict";
//12=8
//13=16
//14=20
//15=20
//16=20
//17=23
//18=27
//19=23
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
//map getcount
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WangbinTest = /** @class */ (function (_super) {
    __extends(WangbinTest, _super);
    function WangbinTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WangbinTest.prototype.onLoad = function () {
        var nTest = 0;
        if (nTest) {
            cc.log("0=true"); //未输出 代表0 为假
        }
        if ("a") {
            cc.log("'a'=true"); //输出 
        }
        var c = 1 && "a"; //c= "a"
        var c2 = 0 && "a"; //c2= 0
        var c3 = 1 || "a"; //c3= 1
        var c4 = 0 || "a"; //c4= "a"
        var vArray = [];
        vArray[100] = 1; //数组下标从0开始
        var nLen = vArray.length; //101 
        var vTestArray = new Array();
        vTestArray.push(4);
        vTestArray["u"] = 9;
        for (var nIndex = 0; nIndex < vTestArray.length; ++nIndex) {
            cc.log("test=" + nIndex + "=" + vTestArray[nIndex] + "=" + vTestArray.length);
            vTestArray[6] = 9;
        }
        var vTestArray2 = new Array();
        vTestArray2.push(4);
        vTestArray2[2] = 9;
        for (var k in vTestArray2) {
            cc.log("==========test2=" + k + "=" + vTestArray[k]);
            vTestArray2[6] = 87;
        }
        var mapEnemyUnit = {};
        mapEnemyUnit[33] = 89;
        mapEnemyUnit[44] = 67;
        for (var k in mapEnemyUnit) {
            cc.log("==========test2=" + k + "=" + mapEnemyUnit[k]);
            delete mapEnemyUnit[44];
        }
        //for(let nIndex=0; nIndex< mapEnemyUnit.length; ++nIndex)
        //{
        //}
    };
    WangbinTest.prototype.clickBegin = function (nTag) {
    };
    WangbinTest.prototype.onDestroy = function () {
    };
    WangbinTest.prototype.start = function () {
    };
    WangbinTest.prototype.update = function (dt) {
        //cc.log("gameapp=dt="+dt);
    };
    WangbinTest.prototype.lateUpdate = function () {
    };
    WangbinTest = __decorate([
        ccclass
    ], WangbinTest);
    return WangbinTest;
}(cc.Component));
exports.default = WangbinTest;

cc._RF.pop();