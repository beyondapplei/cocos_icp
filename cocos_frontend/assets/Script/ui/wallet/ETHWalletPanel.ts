import UIPanel from "../UIPanel"
import UIManager from "../../UIManager";
import { EUIPanelType } from "../../CommonEnum";
import {TableView,CellData} from "../TableView";
import ResManager from "../../ResManager";
import ICPManager from "../../mg/ICPManager";
import LoginManager from "../../mg/LoginManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ETHWalletPanel extends UIPanel {

    tableview: TableView;
  
    editBox: cc.EditBox;
    nIndexReq: number;
    nOrderState: number;

    labelrec: cc.Label;
    labelbalance: cc.Label;

    boxtoaddress: cc.EditBox;
    boxamount: cc.EditBox;

    onLoad(){
        this.nOrderState = 0;

       
        const btnNode =  this.node.getChildByName('btnbegin');
        btnNode.on(cc.Node.EventType.TOUCH_END, this.clickBegin.bind(this, 109825), this);
        
        this.labelrec = this.node.getChildByName('labelrec').getComponent(cc.Label);
        this.labelbalance = this.node.getChildByName('labelbalance').getComponent(cc.Label);
    
        this.boxtoaddress = this.node.getChildByName('boxtoaddress').getComponent(cc.EditBox);
        this.boxamount = this.node.getChildByName('boxamount').getComponent(cc.EditBox);
    
        
        this.labelrec.string = "ICP Rec Address:\n" + "abcd-efgh-ijkl-mnop-qrst-uvwx-yz12-3456-7890";
        this.labelbalance.string = "Balance: 123.456 ICP";

    }
    start () {
    }
    RefreshUI(){
        
    }
   


  
 
    RefreshData() {
       

       
       
        
    }
    OnOpen( strParam: string)
    {
   
          let principalText = LoginManager.Instance.getPrincipalText();
                   
            this.labelrec.string =  principalText || "";
    
            this.labelbalance.string = "Balance: loading...";
            let strIcpLeagerCanisterId = "bw4dl-smaaa-aaaaa-qaacq-cai";
            let balanceText = ICPManager.Instance.GetBalance(principalText,strIcpLeagerCanisterId)
                
                this.labelbalance.string = balanceText ;
              

    }

    

    OnClose()
    {
        
    }
 

    clickBegin(nTag){
        cc.log('clickbegin'+nTag);
        //UIManager.Instance.OpenPanel(EUIPanelType.HOME);
    }

    clickOrder(nTag){
       
            
    


    }

    
}
