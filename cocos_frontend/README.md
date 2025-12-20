# hello-world
Hello world new project template.


编辑器/预览（quick-compile）会炸：即使你在运行时 if (CC_EDITOR) return，静态 import 仍会被依赖分析扫到，之前就是因此触发 “deps 为空 / Can not find deps” 那类崩溃。
Web 运行时也不一定能加载到 node_modules：Cocos Web 构建产物默认不会把 node_modules/@dfinity/* 打进来，导致浏览器端 Cannot find module。


Cocos Creator 2.x 的预览环境（quick-compile）不支持直接加载 ES 模块（ESM），而 @icp-sdk/auth 和 @dfinity/auth-client 都是纯 ESM 包，导致浏览器在执行时遇到无法识别的 import 语句。
解决方案：
1. 打包依赖： 我已使用 esbuild 将 @dfinity/auth-client 打包成 Cocos Creator 2.x 可识别的 CommonJS 格式文件，存放在 auth-client.js。
2. 修改引用： 更新了 LoginManager.ts，使用 require("../Lib/auth-client") 替代直接的 import。