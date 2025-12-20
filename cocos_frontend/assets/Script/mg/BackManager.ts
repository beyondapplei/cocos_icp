

import LoginManager from "./LoginManager";
import { ethers } from "ethers";
import { idlFactoryBack } from "./backend.did";

// import DfinityAgent = require("../Lib/dfinity-agent-wrapper");
const DfinityAgent = (window as any).DfinityAgent;
const Actor = DfinityAgent ? DfinityAgent.Actor : null;
const HttpAgent = DfinityAgent ? DfinityAgent.HttpAgent : null;

import { DFX_NETWORK, II_CANISTER_ID_LOCAL,BACKEND_CANISTER_ID_LOCAL_FALLBACK } from "./DefData";



export default class BackManager {
    public static readonly Instance: BackManager = new BackManager();
    private constructor() {}

    private backendActor: any = null;


    Init() {
        // 预加载后端交互所需的脚本
    }

    private getGlobal(): any {
        return (typeof globalThis !== 'undefined'
            ? globalThis
            : (typeof window !== 'undefined'
                ? window
                : (typeof self !== 'undefined' ? self : {})));
    }

    private getBackendCanisterId(): string | null {
        // const g = this.getGlobal();
        // const injected = (g && (g.CANISTER_ID_backend || g.CANISTER_ID_BACKEND || g.BACKEND_CANISTER_ID)) as string | undefined;
        // if (injected && typeof injected === 'string' && injected.length > 0) return injected;
        if (DFX_NETWORK === 'local') return BACKEND_CANISTER_ID_LOCAL_FALLBACK;
        return null;
    }

    private getAgentHost(): string | undefined {
        const g = this.getGlobal();
        // 如果是本地开发环境，强制指向本地 replica 地址，避免 Cocos Preview (localhost:7456) 拦截请求
        if (DFX_NETWORK === 'local') {
            return 'http://127.0.0.1:4943';
        }
        // 如果是 IC 主网，host 设为 undefined 或 "https://ic0.app"，HttpAgent 默认会连接主网
        return "https://ic0.app";
    }

    private async ensureBackendActor(): Promise<any> {
        if (this.backendActor) return this.backendActor;
        //if (this.isEditorOrPreview()) throw new Error('Backend actor disabled in editor/preview');

        await LoginManager.Instance.ensureAuthClient();
        const identity = await LoginManager.Instance.getIdentity();

        const canisterId = this.getBackendCanisterId();
        if (!canisterId) throw new Error('Backend canisterId not found');

        const host = this.getAgentHost();
        cc.log("BackManager: creating agent with host:", host);
        const agent = new HttpAgent({ identity, host });
        if (DFX_NETWORK === 'local' && agent && agent.fetchRootKey) {
            cc.log("BackManager: fetching root key...");
            await agent.fetchRootKey();
            cc.log("BackManager: root key fetched.");
        }

        this.backendActor = Actor.createActor(idlFactoryBack, { agent, canisterId });
        return this.backendActor;
    }

    async GetEthAddress(): Promise<string> {
        cc.log("BackManager: GetEthAddress called");
        const actor = await this.ensureBackendActor();
        cc.log("BackManager: actor ensured");
        
        const publicKey = await actor.get_eth_public_key();
        cc.log("BackManager: publicKey received:", publicKey);
        const pkBytes = new Uint8Array(publicKey);
        cc.log("BackManager: GetEthAddress publicKey bytes:", pkBytes);

        return ethers.utils.computeAddress(ethers.utils.hexlify(pkBytes));
    }
}
