#!/bin/bash
set -e

# 0. 切换到生产环境库文件
echo "Switching to Production Dfinity Libraries..."
cp cocos_frontend/assets/Script/Lib/dfinity-agent-dev.js cocos_frontend/assets/Script/Lib/dfinity-agent.js
cp cocos_frontend/assets/Script/Lib/dfinity-auth-client-dev.js cocos_frontend/assets/Script/Lib/dfinity-auth-client.js

# 1. 构建 Cocos Creator 前端 (确保代码修改生效)
echo "Building Cocos Creator project..."
/Applications/Cocos/Creator/2.4.14/CocosCreator.app/Contents/MacOS/CocosCreator --path "$(pwd)/cocos_frontend" --build "platform=web-mobile;debug=false"

# 2. 部署 Backend

dfx deploy 

# 3. 部署 Frontend (跳过依赖检查，只更新资源)


echo "Deployment Done!"
