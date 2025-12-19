import UIPanel from "./UIPanel"
import UIManager from "../UIManager";
import { EUIPanelType, ECMDID } from "../CommonEnum";
import BWUnitManager from "../BWUnitManager";
import BWUnit from "./BWUnit";
import BWPlayerUnit from "./BWPlayerUnit";
import EventManager from "../EventManager";
import BWEnemyUnit from "./BWEnemyUnit";


class ElementData{
    ntype: number;
    x:number;
    y:number;
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class EditPanel extends UIPanel {

    battleNode: cc.Node;
    playerMe: BWUnit;
    battleCamera: cc.Camera;
    //onload->start->onopen
    nCreateEnemyCd: number = 0.2;
    nCreateEnemyCdDt: number = 0;

    vElementData = [];
    editBox: cc.EditBox;
    nCurLevel: number = 1;

    vUnit: BWUnit[] = [];

    onLoad(){
        
        let btnBeginNode = this.node.getChildByName('btnbegin');
        btnBeginNode.on(cc.Node.EventType.TOUCH_END, this.clickBegin.bind(this,109825),this);

        let btnBeginNode2 = this.node.getChildByName('btnbegin2');
        btnBeginNode2.on(cc.Node.EventType.TOUCH_END, this.ClickSave.bind(this,109825),this);

        this.battleNode = this.node.getChildByName('battlenode');
        //this.battleCamera = this.battleNode.getChildByName("battlecamera").getComponent(cc.Camera);

        this.editBox = this.node.getChildByName('NewEditBox').getComponent(cc.EditBox);
        this.editBox.string = "1";
        //btnBeginNode2.on(cc.Node.EventType.TOUCH_END, this.ClickSave.bind(this,109825),this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove.bind(this),this);

        let btnLoadNode = this.node.getChildByName('NewButton');
        btnLoadNode.on(cc.Node.EventType.TOUCH_END, this.ClickLoad,this);


    }
    start () {}
    update(dt)
    {
    }
    lateUpdate()
    {
        //this.battleCamera.node.y +=  this.playerMe.nSpeedY;
    }
    ClickLoad()
    {
        cc.log(this.nCurLevel);

        let strFileName = "level_"+this.editBox.string+".json";

        //strFileName = strFileName.format();
        this.ReadLevel(strFileName);
    }
    

    EventOpt(bAdd: boolean)
    {
        
    }

    OnOpen( strParam: string )
    {
        //this.ReadLevel("level_01.json");

    }

    
    GetLocalResourcePath(): string
    {
        return "/Users/binwang/Documents/NewProjectHelloTypeScript/assets/resources/";
    }
    ReadLevel(strFileName: string)
    {
        //var path = cc.url.raw('xxxx');
        //if (cc.loader.md5Pipe) {
        //path = cc.loader.md5Pipe.transformURL(path);
        //}

        //let strPath = this.GetLocalResourcePath();
        //strPath += strFileName;
        let strPath =  cc.url.raw('resources/'+strFileName);
        cc.log("resourcePath="+strPath);
        cc.loader.load(strPath, function(err,res){
            if (err) {
                cc.log(err);
            }else{
                cc.log("loadsuccess="+res.json)
                this.vElementData = res.json;
                //this.WriteLevel("level_01.json");
                //cc.log("length="+this.vElementData.length);
                this.InitLevel();

            }
        }.bind(this));
       
    }
    InitLevel()
    {
        this.vUnit = [];
        for(let nIndex=0; nIndex < this.vElementData.length; ++nIndex)
        {
            let oneEle = this.vElementData[nIndex];
            
            let unit = new BWEnemyUnit();
            unit.Init();
            unit.rootNode.position = new cc.Vec3(this.ToCorrectX(oneEle.x), oneEle.y, 0);
            this.vUnit.push(unit);
        }

    }
    

    ToCorrectX(nX: number)
    {
        nX = Math.floor(nX/80) * 80 + 80*0.5;
        return nX;

    }

    WriteLevel(strFileName: string)
    {
        cc.log("WriteLevel=length="+this.vElementData.length);

        //this.vElementData.splice(0, 1);

        if(cc.sys.isNative)
        {
            //let strWritePath = jsb.fileUtils.getWritablePath();
            //strWritePath += strFileName;
            //cc.log("strWritePath="+strWritePath);

            let strPath = this.GetLocalResourcePath();
            strPath += strFileName;
            let strJsonContent = JSON.stringify(this.vElementData);
            cc.log("strPath="+strPath);
            cc.log("strJsonContent="+strJsonContent);
            jsb.fileUtils.writeStringToFile(strJsonContent,strPath);
        }

          //writeToFile()写入数据到文件，存储格式为xml，不是Json格式
          if(cc.sys.isNative) {
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



    }

    onClose(){
        this.EventOpt(false);

    }  
    //--------

    
    

    ClickSave()
    {
        this.WriteLevel("level_01.json")
    }
    touchMove(e)
    {
        cc.log( "cc.Node.EventType.TOUCH_MOVE" );
        let move_x = e.touch._point.x - e.touch._prevPoint.x;
        let move_y = e.touch._point.y - e.touch._prevPoint.y;
        this.battleNode.x = this.playerMe.rootNode.x + move_x;
        this.battleNode.y = this.playerMe.rootNode.y + move_y;
        
    }

    

    

    
    
    clickBegin(nTag){
        cc.log('clickbegin'+nTag);
        UIManager.Instance.closePanel(EUIPanelType.GAME);
    }

    
}
