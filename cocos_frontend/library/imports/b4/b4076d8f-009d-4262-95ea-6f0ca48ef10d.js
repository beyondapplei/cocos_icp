"use strict";
cc._RF.push(module, 'b40762PAJ1CYpXqbwykjvEN', 'ResManager');
// Script/ResManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TableStruct_1 = require("./TableStruct");
var ResManager = /** @class */ (function () {
    function ResManager() {
        this.mapUIPanelTab = {};
        this.mapSkillTab = {};
        this.mapFunctionTab = {};
        this.mapCoinTab = {};
        this.mapNameTabData = {
            'uipanel': [TableStruct_1.UIPanelTab, this.mapUIPanelTab],
            'functiontype': [TableStruct_1.FunctionTab, this.mapFunctionTab],
            'coin': [TableStruct_1.CoinTab, this.mapCoinTab],
        };
    }
    ResManager.prototype.toRead = function (strParam, strType) {
        if (strType === 'number') {
            return parseFloat(strParam);
        }
        else if (strType === 'string') {
            return strParam;
        }
        else if (strType === 'arrayfloat') {
            var vstrTitle = strParam.split('|');
            var vintA = [];
            for (var nIndex = 0; nIndex < vstrTitle.length; ++nIndex) {
                vintA[nIndex] = parseFloat(vstrTitle[nIndex]);
            }
            return vintA;
        }
        else if (strType === 'arraystring') {
            var vstrTitle = strParam[2].split('|');
            return vstrTitle;
        }
        return '';
    };
    ResManager.prototype.ResManager = function () {
    };
    ResManager.prototype.onLoadTabEnd = function (err, res) {
        cc.log('onLoadTabEnd=' + res.name);
        var strContent = res.text;
        var vstrArray = strContent.split('\r\n');
        var vstrTitleType = vstrArray[0].split(',');
        var vstrTitle = vstrArray[1].split(',');
        var tabAny = this.mapNameTabData[res.name][0];
        var mapData = this.mapNameTabData[res.name][1];
        for (var nIndex = 2; nIndex < vstrArray.length; ++nIndex) {
            var vstrLine = vstrArray[nIndex].split(',');
            var uiPanelTab = new tabAny();
            for (var nIndexLine = 0; nIndexLine < vstrTitleType.length; ++nIndexLine) {
                var strTitleName = vstrTitle[nIndexLine];
                var strTitleType = vstrTitleType[nIndexLine];
                uiPanelTab[strTitleName] = this.toRead(vstrLine[nIndexLine], strTitleType);
            }
            mapData[uiPanelTab.nId] = uiPanelTab;
        }
        //let uiTab:UIPanelTab = this.mapUIPanelTab[2];
        //cc.log('table='+uiTab.strName)
    };
    ResManager.prototype.Init = function () {
        for (var key in this.mapNameTabData) {
            cc.resources.load(key, this.onLoadTabEnd.bind(this));
        }
    };
    ResManager.Instance = new ResManager();
    return ResManager;
}());
exports.default = ResManager;

cc._RF.pop();