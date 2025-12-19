 
import BackManager from "./BackManager";
import UIManager from ".././UIManager";
import LoginManager from "./LoginManager";
import ICPManager from "./ICPManager";




export default class AppManager {
    public static readonly Instance: AppManager = new AppManager();
    private AppManager(){
    }           
 
    Init(){
        LoginManager.Instance.Init();
        BackManager.Instance.Init();
        ICPManager.Instance.Init();
        
    }

    showTip(strTip: string)
    {
        UIManager.ShowTip(strTip);
    }
}
