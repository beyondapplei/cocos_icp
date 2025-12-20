#!/bin/bash
set -e


echo "Building Cocos Creator project..."
/Applications/Cocos/Creator/2.4.14/CocosCreator.app/Contents/MacOS/CocosCreator --path "$(pwd)/cocos_frontend" --build "platform=web-mobile;debug=false"

dfx deploy 

echo "Deployment Done!"
