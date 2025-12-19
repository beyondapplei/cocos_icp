console.log("Start");
const fs = require('fs');
const path = require('path');

// Mock browser environment
global.window = global;
global.self = global;

try {
    const agentLib = require('./assets/Script/Lib/dfinity-agent.js');
    console.log('Keys in agentLib:', Object.keys(agentLib));
    const Actor = agentLib.Actor;
    const validId = "bkyz2-fmaaa-aaaaa-qaaaq-cai";
    console.log('Testing Actor.createActor with ID:', validId);

    try {
        // Mock IDL factory
        const idlFactory = () => { return { service: () => {} }; };
        const agent = new agentLib.HttpAgent({ host: "http://127.0.0.1:4943" });
        
        const actor = Actor.createActor(idlFactory, { agent, canisterId: validId });
        console.log('Successfully created actor');
    } catch (e) {
        console.error('Error creating actor:', e.message);
    }

    // Test base32 directly if possible
    // It's not exported directly on agentLib usually, but let's check
    // agentLib might be the exports object of the bundle.
    
} catch (e) {
    console.error('Failed to load library:', e);
}
