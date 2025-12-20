 
import BackManager from "./BackManager";
import UIManager from ".././UIManager";
import LoginManager from "./LoginManager";
import ICPManager from "./ICPManager";

import { BACKEND_CANISTER_ID_LOCAL_FALLBACK } from "./DefData";


export default class AppManager {
    public static readonly Instance: AppManager = new AppManager();
    private constructor(){
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
    GetBackendCanisterId(): string  {
       
        return BACKEND_CANISTER_ID_LOCAL_FALLBACK;
       
    }

}
