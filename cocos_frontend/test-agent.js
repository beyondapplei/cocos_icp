
global.self = global;
const DfinityAgent = require('./assets/Script/Lib/dfinity-agent.js');
const { Actor, HttpAgent } = DfinityAgent;
// const fetch = require('node-fetch'); // You might need to install this or use global fetch if node version is high enough

// Polyfill fetch for Node environment if needed
if (!global.fetch) {
    // global.fetch = fetch;
}

const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'get_eth_public_key' : IDL.Func([], [IDL.Vec(IDL.Nat8)], []),
  });
};

const canisterId = "bkyz2-fmaaa-aaaaa-qaaaq-cai"; // backend
const host = "http://127.0.0.1:4943";

async function main() {
    console.log("Testing connection to", host, "canister", canisterId);
    
    const agent = new HttpAgent({ host, fetch });
    
    // Fetch root key for local development
    try {
        await agent.fetchRootKey();
        console.log("Root key fetched");
    } catch (e) {
        console.error("Failed to fetch root key:", e);
        return;
    }

    const actor = Actor.createActor(idlFactory, { agent, canisterId });

    try {
        const result = await actor.get_eth_public_key();
        console.log("Result:", result);
    } catch (e) {
        console.error("Actor call failed:", e);
    }
}

main();
