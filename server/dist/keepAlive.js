"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const node_cron_1 = __importDefault(require("node-cron"));
const keepAlive = () => {
    (0, node_fetch_1.default)('https://books-hub-fnso.onrender.com/')
        .then(res => console.log(`Keep-alive ping: ${res.status}`))
        .catch(err => console.error(`Error pinging server: ${err.message}`));
};
node_cron_1.default.schedule('*/14 * * * *', () => {
    console.log('Pinging server to keep it alive...');
    keepAlive();
});
