"use strict";
cc._RF.push(module, '35fedKEE7NJY7HjoJIsSwW3', 'EditPanel');
// Script/ui/EditPanel.ts

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
var UIPanel_1 = require("./UIPanel");
var UIManager_1 = require("../UIManager");
var CommonEnum_1 = require("../CommonEnum");
var BWEnemyUnit_1 = require("./BWEnemyUnit");
var ElementData = /** @class */ (function () {
    function ElementData() {
    }
    return ElementData;
}());
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EditPanel = /** @class */ (function (_super) {
    __extends(EditPanel, _super);
    function EditPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //onload->start->onopen
        _this.nCreateEnemyCd = 0.2;
        _this.nCreateEnemyCdDt = 0;
        _this.vElementData = [];
        _this.nCurLevel = 1;
        _this.vUnit = [];
        return _this;
    }
    EditPanel.prototype.onLoad = function () {
        var btnBeginNode = this.node.getChildByName('btnbegin');
        btnBeginNode.on(cc.Node.EventType.TOUCH_END, this.clickBegin.bind(this, 109825), this);
        var btnBeginNode2 = this.node.getChildByName('btnbegin2');
        btnBeginNode2.on(cc.Node.EventType.TOUCH_END, this.ClickSave.bind(this, 109825), this);
        this.battleNode = this.node.getChildByName('battlenode');
        //this.battleCamera = this.battleNode.getChildByName("battlecamera").getComponent(cc.Camera);
        this.editBox = this.node.getChildByName('NewEditBox').getComponent(cc.EditBox);
        this.editBox.string = "1";
        //btnBeginNode2.on(cc.Node.EventType.TOUCH_END, this.ClickSave.bind(this,109825),this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove.bind(this), this);
        var btnLoadNode = this.node.getChildByName('NewButton');
        btnLoadNode.on(cc.Node.EventType.TOUCH_END, this.ClickLoad, this);
    };
    EditPanel.prototype.start = function () { };
    EditPanel.prototype.update = function (dt) {
    };
    EditPanel.prototype.lateUpdate = function () {
        //this.battleCamera.node.y +=  this.playerMe.nSpeedY;
    };
    EditPanel.prototype.ClickLoad = function () {
        cc.log(this.nCurLevel);
        var strFileName = "level_" + this.editBox.string + ".json";
        //strFileName = strFileName.format();
        this.ReadLevel(strFileName);
    };
    EditPanel.prototype.EventOpt = function (bAdd) {
    };
    EditPanel.prototype.OnOpen = function (strParam) {
        //this.ReadLevel("level_01.json");
    };
    EditPanel.prototype.GetLocalResourcePath = function () {
        return "/Users/binwang/Documents/NewProjectHelloTypeScript/assets/resources/";
    };
    EditPanel.prototype.ReadLevel = function (strFileName) {
        //var path = cc.url.raw('xxxx');
        //if (cc.loader.md5Pipe) {
        //path = cc.loader.md5Pipe.transformURL(path);
        //}
        //let strPath = this.GetLocalResourcePath();
        //strPath += strFileName;
        var strPath = cc.url.raw('resources/' + strFileName);
        cc.log("resourcePath=" + strPath);
        cc.loader.load(strPath, function (err, res) {
            if (err) {
                cc.log(err);
            }
            else {
                cc.log("loadsuccess=" + res.json);
                this.vElementData = res.json;
                //this.WriteLevel("level_01.json");
                //cc.log("length="+this.vElementData.length);
                this.InitLevel();
            }
        }.bind(this));
    };
    EditPanel.prototype.InitLevel = function () {
        this.vUnit = [];
        for (var nIndex = 0; nIndex < this.vElementData.length; ++nIndex) {
            var oneEle = this.vElementData[nIndex];
            var unit = new BWEnemyUnit_1.default();
            unit.Init();
            unit.rootNode.position = new cc.Vec3(this.ToCorrectX(oneEle.x), oneEle.y, 0);
            this.vUnit.push(unit);
        }
    };
    EditPanel.prototype.ToCorrectX = function (nX) {
        nX = Math.floor(nX / 80) * 80 + 80 * 0.5;
        return nX;
    };
    EditPanel.prototype.WriteLevel = function (strFileName) {
        cc.log("WriteLevel=length=" + this.vElementData.length);
        //this.vElementData.splice(0, 1);
        if (cc.sys.isNative) {
            //let strWritePath = jsb.fileUtils.getWritablePath();
            //strWritePath += strFileName;
            //cc.log("strWritePath="+strWritePath);
            var strPath = this.GetLocalResourcePath();
            strPath += strFileName;
            var strJsonContent = JSON.stringify(this.vElementData);
            cc.log("strPath=" + strPath);
            cc.log("strJsonContent=" + strJsonContent);
            jsb.fileUtils.writeStringToFile(strJsonContent, strPath);
        }
        //writeToFile()写入数据到文件，存储格式为xml，不是Json格式
        if (cc.sys.isNative) {
            //cc.log("Path:"+jsb.fileUtils.getWritablePath());
            //cc.log( jsb.fileUtils.writeToFile({"new":"value"},jsb.fileUtils.getWritablePath()+'data.json'));
            //cc.log("fullPathForFilename:"+jsb.fileUtils.fullPathForFilename("resources/data.json"));
        }
        // cc.log("writeStringToFile:"+jsb.fileUtils.writeStringToFile('{"a":"b","c":"d"}', jsb.fileUtils.getWritablePath()+'kk.json'));
        // cc.log("getValueMapFromFile:"+JSON.stringify(jsb.fileUtils.getValueMapFromFile(jsb.fileUtils.getWritablePath()+"kk.json")));
        // var arry=JSON.stringify(jsb.fileUtils.getStringFromFile(jsb.fileUtils.getWritablePath()+"kk.json"));
        // cc.log("arry:"+arry);
        //    cc.loader.load(jsb.fileUtils.getWritablePath()+"kk.json", function(err,res){
        //     if (err) {
        //         cc.log(err);
        //     }else{
        //         let list=res;
        //         cc.log("list:"+list.a);
        //     }
        // });
    };
    EditPanel.prototype.onClose = function () {
        this.EventOpt(false);
    };
    //--------
    EditPanel.prototype.ClickSave = function () {
        this.WriteLevel("level_01.json");
    };
    EditPanel.prototype.touchMove = function (e) {
        cc.log("cc.Node.EventType.TOUCH_MOVE");
        var move_x = e.touch._point.x - e.touch._prevPoint.x;
        var move_y = e.touch._point.y - e.touch._prevPoint.y;
        this.battleNode.x = this.playerMe.rootNode.x + move_x;
        this.battleNode.y = this.playerMe.rootNode.y + move_y;
    };
    EditPanel.prototype.clickBegin = function (nTag) {
        cc.log('clickbegin' + nTag);
        UIManager_1.default.Instance.closePanel(CommonEnum_1.EUIPanelType.GAME);
    };
    EditPanel = __decorate([
        ccclass
    ], EditPanel);
    return EditPanel;
}(UIPanel_1.default));
exports.default = EditPanel;

cc._RF.pop();