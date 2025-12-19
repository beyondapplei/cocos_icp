cp cocos_frontend/assets/Script/Lib/dfinity-agent-prod.js cocos_frontend/assets/Script/Lib/dfinity-agent.js
cp cocos_frontend/assets/Script/Lib/dfinity-auth-client-prod.js cocos_frontend/assets/Script/Lib/dfinity-auth-client.js

/Applications/Cocos/Creator/2.4.14/CocosCreator.app/Contents/MacOS/CocosCreator  --path "$(pwd)/cocos_frontend" --build "platform=web-mobile;debug=false"

dfx deploy