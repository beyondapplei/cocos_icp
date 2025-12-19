"use strict";
cc._RF.push(module, 'e06e8PDMcpBlrVXmELFviMk', 'BWUnitManager');
// Script/BWUnitManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BWPlayerUnit_1 = require("./ui/BWPlayerUnit");
var BWEnemyUnit_1 = require("./ui/BWEnemyUnit");
var BWBulletUnit_1 = require("./ui/BWBulletUnit");
var UIManager_1 = require("./UIManager");
var EventManager_1 = require("./EventManager");
var CommonEnum_1 = require("./CommonEnum");
var BWUnitManager = /** @class */ (function () {
    function BWUnitManager() {
        this.mapEnemyUnit = [];
        this.mapBulletUnit = {};
        this.nScore = 0;
        //vToDeleteUnit: BWUnit[] = [];
        this.vToDeleteUnit = new Array();
        this.bBegin = false;
        this.nCreateId = 0;
        this.playerMe = null;
    }
    BWUnitManager.prototype.Init = function () {
    };
    BWUnitManager.prototype.SetGameBegin = function (bBeginGame) {
        this.bBegin = bBeginGame;
        this.nScore = 0;
    };
    BWUnitManager.prototype.GameOver = function () {
        this.bBegin = false;
        UIManager_1.default.Instance.OpenPanel(CommonEnum_1.EUIPanelType.GAMEEND);
    };
    BWUnitManager.prototype.DeleteAllUnit = function () {
        this.playerMe.OnDead();
        for (var nIndex = 0; nIndex < this.vToDeleteUnit.length; ++nIndex) {
            this.DeleteUnit(this.vToDeleteUnit[nIndex]);
        }
        this.vToDeleteUnit = [];
        for (var key in this.mapEnemyUnit) {
            this.DeleteUnit(this.mapEnemyUnit[key]);
        }
        this.mapEnemyUnit = [];
        for (var key in this.mapBulletUnit) {
            this.DeleteUnit(this.mapBulletUnit[key]);
        }
        this.mapBulletUnit = {};
        this.vToDeleteUnit = [];
    };
    BWUnitManager.prototype.update = function (dt) {
        if (!this.bBegin) {
            return;
        }
        for (var nIndex = 0; nIndex < this.vToDeleteUnit.length; ++nIndex) {
            this.DeleteUnit(this.vToDeleteUnit[nIndex]);
        }
        this.vToDeleteUnit = [];
        this.playerMe.update(dt);
        for (var key in this.mapEnemyUnit) {
            this.mapEnemyUnit[key].update(dt);
        }
        for (var key in this.mapBulletUnit) {
            this.mapBulletUnit[key].update(dt);
        }
        this.CheclCollision();
    };
    BWUnitManager.prototype.CheclCollision = function () {
        for (var ke in this.mapEnemyUnit) {
            var enemy = this.mapEnemyUnit[ke];
            if (enemy.bDead) {
                continue;
            }
            var eBox = enemy.rootNode.getBoundingBox(); //Rect
            for (var kb in this.mapBulletUnit) {
                var bullet = this.mapBulletUnit[kb];
                if (bullet.bDead) {
                    continue;
                }
                var bBox = bullet.rootNode.getBoundingBox();
                if (eBox.intersects(bBox)) {
                    bullet.bDead = true;
                    BWUnitManager.Instance.AddUnitToDelete(bullet);
                    //BWUnitManager.Instance.AddUnitToDelete(enemy);
                    enemy.BeAttacked();
                }
            }
            var meBox = this.playerMe.rootNode.getBoundingBox();
            if (eBox.intersects(meBox)) {
                enemy.Dead();
                this.playerMe.BeAttacked();
            }
        }
    };
    BWUnitManager.prototype.AddUnitToDelete = function (unit) {
        //unit.bDead = true;
        this.vToDeleteUnit.push(unit);
    };
    BWUnitManager.prototype.DeleteUnit = function (unit) {
        var eUnitType = Math.floor(unit.nId / 100000);
        if (eUnitType === CommonEnum_1.EUnitType.ENEMY) {
            this.mapEnemyUnit[unit.nId].OnDead();
            delete this.mapEnemyUnit[unit.nId];
        }
        else if (eUnitType === CommonEnum_1.EUnitType.BULLET) {
            this.mapBulletUnit[unit.nId].OnDead();
            delete this.mapBulletUnit[unit.nId];
        }
    };
    BWUnitManager.prototype.CreatePlayer = function () {
        this.playerMe = new BWPlayerUnit_1.default();
        this.playerMe.Init();
        this.nCreateId++;
        this.playerMe.nId = CommonEnum_1.EUnitType.ME * 100000 + this.nCreateId;
        return this.playerMe;
    };
    BWUnitManager.prototype.CreateEnemy = function () {
        var enemy = new BWEnemyUnit_1.default();
        enemy.Init();
        this.nCreateId++;
        enemy.nId = CommonEnum_1.EUnitType.ENEMY * 100000 + this.nCreateId;
        this.mapEnemyUnit[enemy.nId] = enemy;
        return enemy;
    };
    BWUnitManager.prototype.CreateBullet = function () {
        var bullet = new BWBulletUnit_1.default();
        bullet.Init();
        this.nCreateId++;
        bullet.nId = CommonEnum_1.EUnitType.BULLET * 100000 + this.nCreateId;
        this.mapBulletUnit[bullet.nId] = bullet;
        return bullet;
    };
    BWUnitManager.prototype.AddScore = function () {
        this.nScore += 1;
        EventManager_1.default.Instance.FireEvent(CommonEnum_1.ECMDID.REFRESHSCORE);
    };
    BWUnitManager.Instance = new BWUnitManager();
    return BWUnitManager;
}());
exports.default = BWUnitManager;

cc._RF.pop();