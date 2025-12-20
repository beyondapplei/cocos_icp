 
import UIManager from "../UIManager";
import LoginManager from "./LoginManager";
import { DFX_NETWORK, LEAGER_ICP_ID_LOCAL } from "./DefData";

// 导入 ethers.js 相关（需要先安装 ethers.js 库）
//import { JsonRpcProvider, Transaction, parseEther, keccak256, getBytes, hexlify } from 'ethers';


export default class ETHManager {
    public static readonly Instance: ETHManager = new ETHManager();
    private ETHManager(){
    }           
 
    Init(){
   
    }
    private backendActor: any = null; // 后端 canister actor 用于签名
   // private provider: JsonRpcProvider | null = null;
   
    // async GetBalanceETH(ethAddress: string): Promise<string> {
        
    //     try {
    //         if (!this.provider) {
    //             this.provider = new JsonRpcProvider('https://ethereum-sepolia-rpc.publicnode.com');
    //         }
    //         const bal = await this.provider.getBalance(ethAddress);
    //         const balanceInEth = parseFloat(bal.toString()) / 1e18; // 转换为 ETH
    //         return `Balance: ${balanceInEth.toFixed(6)} ETH`;
    //     } catch (e) {
    //         console.error(e);
    //         return 'Balance: error';
    //     }
    // }

    // async SendETH(fromAddr: string,toAddr: string, amountStr: string): Promise<string> {
       
    //     // if (!this.backendActor) {
    //     //     throw new Error('Backend actor not initialized');
    //     // }

    //     // try {
    //     //     if (!this.provider) {
    //     //         this.provider = new JsonRpcProvider('https://ethereum-sepolia-rpc.publicnode.com');
    //     //     }
    //     //     const chainId = (await this.provider.getNetwork()).chainId;
    //     //     const nonce = await this.provider.getTransactionCount(fromAddr);
    //     //     const feeData = await this.provider.getFeeData();

    //     //     const tx = new Transaction();
    //     //     tx.to = toAddr;
    //     //     tx.value = parseEther(amountStr);
    //     //     tx.nonce = nonce;
    //     //     tx.chainId = chainId;
    //     //     tx.maxFeePerGas = feeData.maxFeePerGas;
    //     //     tx.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
    //     //     tx.gasLimit = 21000n;
    //     //     tx.type = 2;

    //     //     this.updateStatus("Signing with Canister...");
            
    //     //     // 调用后端签名
    //     //     const unsignedSerialized = tx.unsignedSerialized;
    //     //     const msgHash = keccak256(unsignedSerialized);
    //     //     const msgHashBytes = getBytes(msgHash);

    //     //     const signatureBlob = await this.backendActor.sign(Array.from(msgHashBytes));
    //     //     const signatureBytes = new Uint8Array(signatureBlob);

    //     //     const r = hexlify(signatureBytes.slice(0, 32));
    //     //     const s = hexlify(signatureBytes.slice(32, 64));

    //     //     // 尝试恢复签名
    //     //     const sig0 = { r, s, yParity: 0 };
    //     //     const sig1 = { r, s, yParity: 1 };

    //     //     let signedTx = tx.clone();
    //     //     signedTx.signature = sig0;


    //     //     const serialized = signedTx.serialized;
    //     //     const response = await this.provider.broadcastTransaction(serialized);
            
            
    //     //     await response.wait();
    //     //     return `Transaction confirmed: ${response.hash}`;
    //     // } catch (e: any) {
    //     //     console.error(e);
    //     //     throw e;
    //     // }
    // }

}
