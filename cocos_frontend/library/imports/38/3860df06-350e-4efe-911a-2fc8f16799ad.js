"use strict";
cc._RF.push(module, '3860d8GNQ5O/pEaL8jxZ5mt', 'TableView');
// Script/ui/TableView.ts

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
exports.TableView = exports.CellData = void 0;
var CellData = /** @class */ (function () {
    function CellData() {
    }
    return CellData;
}());
exports.CellData = CellData;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TableView = /** @class */ (function (_super) {
    __extends(TableView, _super);
    function TableView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollViewNode = null;
        _this.nodeElement = null;
        _this.nAllNum = 0;
        _this.scrollView = null;
        _this._isUsedCellsDirty = false;
        _this._indices = {};
        _this._vCellsPositions = [];
        _this._cellsUsed = [];
        _this._cellsFreed = new Array();
        return _this;
    }
    TableView.prototype.setRefreshCellCallBack = function (target, refreshCell, getCellHeight) {
        this.target = target;
        this.refreshCellCallBack = refreshCell;
        this.getCellHeightCallBack = getCellHeight;
    };
    TableView.prototype.onLoad = function () {
        this.scrollView = this.scrollViewNode.getComponent(cc.ScrollView);
        this.scrollViewNode.on('scrolling', this.scrollViewDidScroll, this);
        this.scrollViewNode.on('scrolling', this.scrollViewDidScroll, this);
    };
    TableView.prototype.indexFromOffset = function (search) {
        var low = 0;
        var high = this.nAllNum - 1;
        while (high >= low) {
            var index = low + Math.floor((high - low) / 2);
            var cellStart = this._vCellsPositions[index];
            var cellEnd = this._vCellsPositions[index + 1];
            if (search >= cellStart && search <= cellEnd) {
                return index;
            }
            else if (search < cellStart) {
                high = index - 1;
            }
            else {
                low = index + 1;
            }
        }
        //if (low <= 0) {
        //    return 0;
        //}
        return -1;
    };
    TableView.prototype.updateCellPositions = function () {
        this._vCellsPositions = [];
        if (this.nAllNum > 0) {
            var currentPos = 0;
            for (var nIndex = 0; nIndex < this.nAllNum; nIndex++) {
                this._vCellsPositions[nIndex] = currentPos;
                var nHeight = this.getCellHeightCallBack.call(this.target, nIndex);
                currentPos += nHeight;
            }
            this._vCellsPositions[this.nAllNum] = currentPos; //1 extra value allows us to get right/bottom of the last cell
        }
    };
    TableView.prototype.updateContentSize = function () {
        if (this.nAllNum <= 0) {
            return;
        }
        var nHeight = this._vCellsPositions[this.nAllNum];
        //let contentWidth = this.scrollView.content.getContentSize().width;
        var nTableViewHeight = this.scrollViewNode.getContentSize().height;
        if (nHeight < nTableViewHeight) {
            nHeight = nTableViewHeight;
        }
        this.scrollView.content.height = nHeight;
    };
    TableView.prototype.reloadData = function (nCount) {
        this.nAllNum = nCount;
        for (var nIndex = 0; nIndex < this._cellsUsed.length; ++nIndex) {
            var cell = this._cellsUsed[nIndex];
            this._cellsFreed.push(cell);
            cell.node.removeFromParent(false);
        }
        this._indices = {};
        this._cellsUsed = [];
        this.updateCellPositions();
        this.updateContentSize();
        this.scrollViewDidScroll(this.scrollView);
    };
    TableView.prototype.moveCellOutOfSight = function (cellData) {
        this._cellsFreed.push(cellData);
        this._cellsUsed.splice(this._cellsUsed.indexOf(cellData), 1);
        this._isUsedCellsDirty = true;
        delete this._indices[cellData.nId];
        cellData.node.removeFromParent(false);
    };
    TableView.prototype.scrollViewDidScroll = function (scrollView) {
        if (this.nAllNum === 0) {
            return;
        }
        if (this._isUsedCellsDirty) {
            this._isUsedCellsDirty = false;
            this._cellsUsed.sort(function (v1, v2) {
                return v1.nId - v2.nId;
            });
        }
        var nContentPosY = this.scrollView.content.position.y; //-100
        if (nContentPosY < 0) {
            nContentPosY = 0;
        }
        var nTableViewHeight = this.scrollViewNode.height;
        var nBeginPosY = Math.abs(nContentPosY);
        var nEndPosY = nBeginPosY + nTableViewHeight;
        var startIdx = this.indexFromOffset(nBeginPosY);
        var endIdx = this.indexFromOffset(nEndPosY);
        if (startIdx === -1) {
            //startIdx = this.nAllNum - 1;
            startIdx = 0;
        }
        if (endIdx === -1) {
            endIdx = this.nAllNum - 1;
        }
        var idx = 0;
        if (this._cellsUsed.length > 0) {
            var cellData = this._cellsUsed[0];
            idx = cellData.nId;
            while (idx < startIdx) {
                this.moveCellOutOfSight(cellData);
                if (this._cellsUsed.length > 0) {
                    cellData = this._cellsUsed[0];
                    idx = cellData.nId;
                }
                else {
                    break;
                }
            }
        }
        if (this._cellsUsed.length > 0) {
            var cellData = this._cellsUsed[this._cellsUsed.length - 1];
            idx = cellData.nId;
            while (idx <= this.nAllNum - 1 && idx > endIdx) {
                this.moveCellOutOfSight(cellData);
                if (this._cellsUsed.length > 0) {
                    cellData = this._cellsUsed[this._cellsUsed.length - 1];
                    idx = cellData.nId;
                }
                else {
                    break;
                }
            }
        }
        for (var i = startIdx; i <= endIdx; i++) {
            if (this._indices[i] != null) {
                continue;
            }
            this.updateCellAtIndex(i);
        }
    };
    TableView.prototype.createElementNode = function () {
        return cc.instantiate(this.nodeElement);
    };
    TableView.prototype.dequeueCell = function () {
        if (this._cellsFreed.length === 0) {
            //let cell = new CellData();
            //cell.node = cc.instantiate(this.nodeElement);
            return null;
        }
        else {
            var cell = this._cellsFreed[0];
            this._cellsFreed.splice(0, 1);
            return cell;
        }
    };
    TableView.prototype.updateCellAtIndex = function (idx) {
        //let cellData = this.dequeueCell();
        var cellData = this.refreshCellCallBack.call(this.target, idx);
        cellData.nId = idx;
        cellData.node.setPosition(new cc.Vec2(0, -this._vCellsPositions[idx]));
        this.scrollView.content.addChild(cellData.node);
        this._cellsUsed.push(cellData);
        this._indices[idx] = idx;
        this._isUsedCellsDirty = true;
    };
    TableView.prototype.addCellAtLast = function () {
        this.nAllNum = this.nAllNum + 1;
        this.updateCellPositions();
        this.updateContentSize();
        //this.scrollViewDidScroll(this.scrollView);
        /*
                let idx = this.nAllNum - 1;
                let cellData = this.refreshCellCallBack.call(this.target,idx)
                cellData.nId = idx;
                //cellData.node.setPosition(new cc.Vec2(0,-this._vCellsPositions[idx]));
                this.scrollView.content.addChild(cellData.node);
                //this._cellsUsed.push(cellData);
                //this._indices[idx] = idx;
                //this._isUsedCellsDirty = true;*/
    };
    TableView.prototype.onDestroy = function () {
    };
    TableView.prototype.start = function () {
    };
    TableView.prototype.update = function () {
    };
    TableView.prototype.lateUpdate = function () {
    };
    __decorate([
        property(cc.Node)
    ], TableView.prototype, "scrollViewNode", void 0);
    __decorate([
        property(cc.Node)
    ], TableView.prototype, "nodeElement", void 0);
    TableView = __decorate([
        ccclass
    ], TableView);
    return TableView;
}(cc.Component));
exports.TableView = TableView;

cc._RF.pop();