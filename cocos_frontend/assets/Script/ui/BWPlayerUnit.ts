
import BWUnit from "./BWUnit";
//import BWUnitManager from "./BWUnitManager";
import EventManager from "../EventManager";
import { ECMDID } from "../CommonEnum";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BWPlayerUnit extends BWUnit {
    nCreateBulletCd: number = 0.1;
    nCreateBulletCdDt: number = 0;

    Init()
    {
        super.Init();
        this.nHp = 3;
        cc.log("BWPlayerUnit.Init")
        this.nSpeedY = 1;    
        
        function onLoadTexturebEnd(err, spriteFrame)
        {
            let sprite = this.rootNode.addComponent(cc.Sprite)  
            sprite.spriteFrame = spriteFrame  

            sprite.type = cc.Sprite.Type.SIMPLE;
            sprite.sizeMode = cc.Sprite.SizeMode.RAW;
            //this.rootNode.setContentSize(80,80);
        }
        cc.loader.loadRes( "texture/plane", cc.SpriteFrame, onLoadTexturebEnd.bind(this));
    }
    update(dt)
    {
        if(this.bDead)
        {
            return;
        }
        super.update(dt);
        this.nCreateBulletCdDt += dt;
        if(this.nCreateBulletCdDt > this.nCreateBulletCd)
        {
            //BWUnitManager.Instance.CreateBullet();
            EventManager.Instance.FireEvent(ECMDID.CREATEBULLET);
            this.nCreateBulletCdDt = 0;
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
        EventManager.Instance.FireEvent(ECMDID.REFRESHPLAYERHP);
        if(this.nHp <= 0)
        {
            this.bDead = true;
            
            let BWUnitManager = require("./BWUnitManager").default;
            BWUnitManager.Instance.GameOver();
        }
        //this.labelNum.string = this.nHp.toString();
    }

}
