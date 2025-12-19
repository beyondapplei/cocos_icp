"use strict";
cc._RF.push(module, '201ecdDmwZIoZ/DoRd9wUXY', 'UIPanel');
// Script/ui/UIPanel.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIPanel = /** @class */ (function (_super) {
    __extends(UIPanel, _super);
    function UIPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIPanel.prototype.OnOpen = function (strParam) {
    };
    UIPanel.prototype.OnClose = function () {
    };
    UIPanel.prototype.onLoad = function () {
        //this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegin.bind(this,125),this);
        //this.node.on(cc.Node.EventType.TOUCH_START, function(e){e.stopPropation();});
    };
    UIPanel.prototype.onTouchBegin = function () {
        //this.node.stopPropation();
    };
    UIPanel.prototype.start = function () {
    };
    UIPanel.prototype.update = function (dt) {
    };
    UIPanel.prototype.lateUpdate = function () {
    };
    UIPanel = __decorate([
        ccclass
    ], UIPanel);
    return UIPanel;
}(cc.Component));
exports.default = UIPanel;

cc._RF.pop();