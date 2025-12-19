# hello-world
Hello world new project template.


编辑器/预览（quick-compile）会炸：即使你在运行时 if (CC_EDITOR) return，静态 import 仍会被依赖分析扫到，之前就是因此触发 “deps 为空 / Can not find deps” 那类崩溃。
Web 运行时也不一定能加载到 node_modules：Cocos Web 构建产物默认不会把 node_modules/@dfinity/* 打进来，导致浏览器端 Cannot find module。