"use strict";
cc._RF.push(module, '4a1f9pjqNpBA73eWZ3xMV27', 'DefData');
// Script/mg/DefData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BACKEND_CANISTER_ID_LOCAL_FALLBACK = exports.II_CANISTER_ID_LOCAL = exports.DFX_NETWORK = void 0;
exports.DFX_NETWORK = "local"; // 或 "ic"
exports.II_CANISTER_ID_LOCAL = "bw4dl-smaaa-aaaaa-qaacq-cai"; //"br5f7-7uaaa-aaaaa-qaaca-cai";
// 本地 backend canister id（默认 dfx new 项目常见值）；IC/自定义环境建议通过全局变量注入覆盖。
exports.BACKEND_CANISTER_ID_LOCAL_FALLBACK = "be2us-64aaa-aaaaa-qaabq-cai";

cc._RF.pop();