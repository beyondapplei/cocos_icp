
import BWUnit from "./BWUnit";
//import BWUnitManager from "./BWUnitManager";
import { EUIPanelType } from "../CommonEnum";
import UIManager from "../UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BWBulletUnit extends BWUnit  {

    Init()
    {
        super.Init();
        cc.log("BWEnemyUnit.Init")

        this.nSpeedY = 20;
        //this.rootNode.color = new cc.Color(255,0,0,255);
    
        function onLoadTexturebEnd(err, spriteFrame)
        {
            let sprite = this.rootNode.addComponent(cc.Sprite)  
            sprite.spriteFrame = spriteFrame  

            sprite.type = cc.Sprite.Type.SIMPLE;
            sprite.sizeMode = cc.Sprite.SizeMode.RAW;
            //this.rootNode.setContentSize(80,80);

        }
        cc.loader.loadRes( "texture/bullet", cc.SpriteFrame, onLoadTexturebEnd.bind(this));

    }
    update(dt)
    {
        if(this.bDead)
        {
            return;
        }
        super.update(dt);
        let gamePanel: any = UIManager.Instance.GetPanel(EUIPanelType.GAME);
        if(gamePanel.InOutCameraTop(this))
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

}
