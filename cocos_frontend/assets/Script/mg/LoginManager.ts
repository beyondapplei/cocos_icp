
import EventManager from "../EventManager";
import "./GlobalPolyfill";
import DfinityAuthClient = require("../Lib/dfinity-auth-client");

const AuthClient = (DfinityAuthClient as any).AuthClient;

import {ECMDID} from "../CommonEnum";

import { DFX_NETWORK, II_CANISTER_ID_LOCAL } from "./DefData";



export default class LoginManager {
    public static readonly Instance: LoginManager = new LoginManager();
    private constructor() {}

    private authClient: any = null;

    Init() {
        // void this.ensureAuthClient().catch(() => {
        //     // UI 层自行提示；这里不抛出
        // });
    }

    // private isEditorOrPreview(): boolean {
    //     return ((typeof CC_EDITOR !== 'undefined' && (CC_EDITOR as any)) ||
    //         (typeof CC_PREVIEW !== 'undefined' && (CC_PREVIEW as any))) as any;
    // }

    // private getGlobal(): any {
    //     return (typeof globalThis !== 'undefined'
    //         ? globalThis
    //         : (typeof window !== 'undefined'
    //             ? window
    //             : (typeof self !== 'undefined' ? self : {})));
    // }

    public async ensureAuthClient(): Promise<any> {
        if (this.authClient) return this.authClient;
        
        const client = await AuthClient.create();
        if (!client) throw new Error('AuthClient creation failed');
        this.authClient = client;

        return this.authClient;
    }

    async isAuthenticated(): Promise<boolean> {
        const client = await this.ensureAuthClient();
        return !!(await client.isAuthenticated());
    }

    async getIdentity(): Promise<any> {
        const client = await this.ensureAuthClient();
        return client.getIdentity();
    }

    getPrincipalText(): string | null {
        if (!this.authClient) return null;
        try {
            const identity = this.authClient.getIdentity();
            return identity.getPrincipal().toText();
        } catch {
            return null;
        }
    }

    private formatErrorMessage(err: any): string {
        if (!err) return 'Unknown error';
        if (typeof err === 'string') return err;
        if (err instanceof Error && err.message) return err.message;
        if (typeof err.message === 'string' && err.message) return err.message;
        if (typeof err.error === 'string' && err.error) return err.error;
        try {
            return JSON.stringify(err);
        } catch {
            return String(err);
        }
    }

    // loginCallBack(): void {
    //     // no op
    //     EventManager.Instance.FireEvent(ECMDID.LoginSuccess);
    // }

    login(onSuccessCallBack?: () => void, onError?: (err: any) => void): void {
        if (!this.authClient) {
            if (onError) onError(new Error("AuthClient not ready"));
            return;
        }

        let iiUrl = '';
        if (DFX_NETWORK === 'local') {
            iiUrl = `http://${II_CANISTER_ID_LOCAL}.localhost:4943/#authorize`;
        } else {
            iiUrl = 'https://identity.ic0.app/#authorize';
        }

        this.authClient.login({
            identityProvider: iiUrl,
            onSuccess: () => {
                if (onSuccessCallBack) onSuccessCallBack();
            },
            onError: (err: any) => {
                const msg = `Login failed: ${this.formatErrorMessage(err)}`;
                if (onError) onError(new Error(msg));
            },
        });
    }
}
