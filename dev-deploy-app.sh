#!/bin/bash
set -e

# 0. 切换到生产环境库文件
echo "Switching to Production Dfinity Libraries..."
cp cocos_frontend/assets/Script/Lib/dfinity-agent-dev.js cocos_frontend/assets/Script/Lib/dfinity-agent.js


echo "Switching to dfinity-agent-dev.js"


