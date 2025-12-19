"use strict";
cc._RF.push(module, '1b1a5nJTIJIxLXabWDluyAo', 'AppkManager');
// Script/mg/AppkManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BackManager_1 = require("./BackManager");
var UIManager_1 = require(".././UIManager");
var LoginManager_1 = require("./LoginManager");
var AppManager = /** @class */ (function () {
    function AppManager() {
    }
    AppManager.prototype.AppManager = function () {
    };
    AppManager.prototype.Init = function () {
        LoginManager_1.default.Instance.Init();
        BackManager_1.default.Instance.Init();
    };
    AppManager.prototype.showTip = function (strTip) {
        UIManager_1.default.ShowTip(strTip);
    };
    AppManager.Instance = new AppManager();
    return AppManager;
}());
exports.default = AppManager;

cc._RF.pop();