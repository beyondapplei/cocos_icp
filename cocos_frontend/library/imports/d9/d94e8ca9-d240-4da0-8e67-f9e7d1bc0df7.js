"use strict";
cc._RF.push(module, 'd94e8yp0kBNoI5n+efRvA33', 'CommonEnum');
// Script/CommonEnum.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EUIPanelType = exports.EUnitType = exports.ESceneType = exports.ECMDID = void 0;
var ECMDID;
(function (ECMDID) {
    ECMDID[ECMDID["LOGIN"] = 0] = "LOGIN";
    ECMDID[ECMDID["GAME"] = 1] = "GAME";
    ECMDID[ECMDID["CREATEBULLET"] = 2] = "CREATEBULLET";
    ECMDID[ECMDID["CLEARBATTLEUI"] = 3] = "CLEARBATTLEUI";
    ECMDID[ECMDID["REFRESHPLAYERHP"] = 4] = "REFRESHPLAYERHP";
    ECMDID[ECMDID["REFRESHSCORE"] = 5] = "REFRESHSCORE";
    ECMDID[ECMDID["LoginSuccess"] = 6] = "LoginSuccess";
})(ECMDID = exports.ECMDID || (exports.ECMDID = {}));
var ESceneType;
(function (ESceneType) {
    ESceneType[ESceneType["LOGIN"] = 0] = "LOGIN";
    ESceneType[ESceneType["GAME"] = 1] = "GAME";
})(ESceneType = exports.ESceneType || (exports.ESceneType = {}));
var EUnitType;
(function (EUnitType) {
    EUnitType[EUnitType["ME"] = 1] = "ME";
    EUnitType[EUnitType["ENEMY"] = 2] = "ENEMY";
    EUnitType[EUnitType["BULLET"] = 3] = "BULLET";
    EUnitType[EUnitType["ITEM"] = 4] = "ITEM";
})(EUnitType = exports.EUnitType || (exports.EUnitType = {}));
var EUIPanelType;
(function (EUIPanelType) {
    EUIPanelType[EUIPanelType["LOGIN"] = 1] = "LOGIN";
    EUIPanelType[EUIPanelType["HOME"] = 2] = "HOME";
    EUIPanelType[EUIPanelType["GAME"] = 3] = "GAME";
    EUIPanelType[EUIPanelType["GAMEEND"] = 4] = "GAMEEND";
    EUIPanelType[EUIPanelType["EDIT"] = 5] = "EDIT";
    EUIPanelType[EUIPanelType["HOMELIST"] = 6] = "HOMELIST";
    EUIPanelType[EUIPanelType["WALLET"] = 7] = "WALLET";
})(EUIPanelType = exports.EUIPanelType || (exports.EUIPanelType = {}));

cc._RF.pop();