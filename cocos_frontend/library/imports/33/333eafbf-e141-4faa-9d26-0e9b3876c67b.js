"use strict";
cc._RF.push(module, '333ea+/4UFPqp0mDps4dsZ7', 'EventManager');
// Script/EventManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TargetData = /** @class */ (function () {
    function TargetData() {
    }
    return TargetData;
}());
var CMDData = /** @class */ (function () {
    function CMDData() {
        this.vTarget = new Array();
    }
    return CMDData;
}());
var EventManager = /** @class */ (function () {
    function EventManager() {
        this.mapEvent = {};
    }
    EventManager.prototype.UIManager = function () {
    };
    EventManager.FireEvent = function (nCMDId, strParam) {
        EventManager.Instance.FireEvent(nCMDId, strParam);
    };
    EventManager.prototype.Init = function () {
    };
    EventManager.prototype.IsHaveEvent = function (nCMDId, target, callback) {
        if (this.mapEvent[nCMDId] == null) {
            return false;
        }
        var mapEvent = this.mapEvent[nCMDId];
        for (var nIndex = 0; nIndex < mapEvent.vTarget.length; ++nIndex) {
            var tagetData = mapEvent.vTarget[nIndex];
            if (tagetData.callback === callback && tagetData.target === target) {
                return true;
            }
        }
        return false;
    };
    EventManager.prototype.AddEvent = function (nCMDId, target, callback) {
        if (this.IsHaveEvent(nCMDId, target, callback)) {
            return;
        }
        if (this.mapEvent[nCMDId] == null) {
            this.mapEvent[nCMDId] = new CMDData();
        }
        var makpEvent = this.mapEvent[nCMDId];
        var targetD = new TargetData();
        targetD.target = target;
        targetD.callback = callback;
        makpEvent.vTarget.push(targetD);
    };
    EventManager.prototype.RemoveEvent = function (nCMDId, target, callback) {
        if (this.IsHaveEvent(nCMDId, target, callback) === false) {
            return;
        }
        var mapEvent = this.mapEvent[nCMDId];
        for (var nIndex = 0; nIndex < mapEvent.vTarget.length; ++nIndex) {
            var tagetData = mapEvent.vTarget[nIndex];
            if (tagetData.target === target && tagetData.callback === callback) {
                mapEvent.vTarget.splice(nIndex, 1);
                return;
            }
        }
    };
    EventManager.prototype.FireEvent = function (nCMDId, strParam) {
        if (this.mapEvent[nCMDId] == null) {
            return;
        }
        var mapEvent = this.mapEvent[nCMDId];
        for (var nIndex = 0; nIndex < mapEvent.vTarget.length; ++nIndex) {
            var tagetData = mapEvent.vTarget[nIndex];
            if (tagetData.target && tagetData.callback) {
                tagetData.callback.call(tagetData.target, strParam);
            }
        }
    };
    EventManager.Instance = new EventManager();
    return EventManager;
}());
exports.default = EventManager;

cc._RF.pop();