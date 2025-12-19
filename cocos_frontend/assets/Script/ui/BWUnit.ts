
import UIManager from "../UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BWUnit {

    nId: number = 0;
    rootNode: cc.Node;
    nSpeedY: number = 0;
    bDead: boolean = false;
    nHp: number = 6;

    Init()
    {
        cc.log("BWUnit.Init")
        this.rootNode = new cc.Node();
        
        
    }
    update(dt)
    {
        this.rootNode.y += this.nSpeedY;
    }

    OnDead()
    {
        this.rootNode.removeFromParent(true);
    }
    BeAttacked()
    {}
    Dead()
    {}

}
