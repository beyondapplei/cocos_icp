
const {ccclass, property} = cc._decorator;

@ccclass
export default class UIPanel extends cc.Component {
    
   
    OnOpen(strParam: string)
    {

    }
    OnClose()
    {

    }
    onLoad(){
        //this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegin.bind(this,125),this);
        //this.node.on(cc.Node.EventType.TOUCH_START, function(e){e.stopPropation();});

    }
    onTouchBegin()
    {
        //this.node.stopPropation();

    }

    start () {
       
    }

    update(dt){

        
    }
    lateUpdate(){

    }
}
