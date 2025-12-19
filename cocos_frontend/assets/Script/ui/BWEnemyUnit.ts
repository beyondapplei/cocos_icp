
import BWUnit from "./BWUnit";
import UIManager from "../UIManager";
//import BWUnitManager from "./BWUnitManager";
import {ECMDID, ESceneType, EUIPanelType, EUnitType} from "../CommonEnum";


const {ccclass, property} = cc._decorator;

@ccclass
export default class BWEnemyUnit extends BWUnit  {

    labelNum: cc.Label
    
    Init()
    {
        super.Init();
        this.nHp = 6;
        this.nSpeedY = -(Math.random()*15+1);
        cc.log("BWEnemyUnit.Init")
    
        function onLoadTexturebEnd(err, spriteFrame)
        {
            let sprite = this.rootNode.addComponent(cc.Sprite)  
            sprite.spriteFrame = spriteFrame  
            sprite.type = cc.Sprite.Type.SIMPLE;
            sprite.sizeMode = cc.Sprite.SizeMode.RAW;
        }
        let nNum = Math.round(Math.random()*2)+1
        let strEnemyName = "enemy" + nNum;
        cc.log(strEnemyName)
        cc.loader.loadRes( "texture/"+strEnemyName, cc.SpriteFrame, onLoadTexturebEnd.bind(this));
        let labNode = new cc.Node()
        this.labelNum = labNode.addComponent(cc.Label);
        this.labelNum.node.color = cc.Color.RED;
        labNode.parent = this.rootNode;

    }
    update(dt)
    {
        if(this.bDead)
        {
            return;
        }
        super.update(dt);

        let gamePanel: any = UIManager.Instance.GetPanel(EUIPanelType.GAME);
        if(gamePanel.InOutCameraBottom(this))
        {
            this.bDead = true;
            let BWUnitManager = require("./BWUnitManager").default;
            BWUnitManager.Instance.AddUnitToDelete(this);
        }

    }
    OnDead()
    {
        super.OnDead();

    }
    BeAttacked()
    {
        if(this.bDead){return;}
        this.nHp--;
        if(this.nHp <= 0)
        {
            this.Dead();
        }
        this.labelNum.string = this.nHp.toString();
    }
    Dead()
    {
        if(this.bDead){return;}
        this.bDead = true;
        this.labelNum.string = "";
        let BWUnitManager = require("./BWUnitManager").default;
        BWUnitManager.Instance.AddScore();
        BWUnitManager.Instance.AddUnitToDelete(this);
    }


}
