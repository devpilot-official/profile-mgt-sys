"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
require("reflect-metadata");
// import { publisher } from '@random-guys/eventbus';
const http_1 = __importDefault(require("http"));
const env_1 = __importDefault(require("./common/config/env"));
const services_1 = require("./common/services");
const app_1 = require("./server/app");
const start = async () => {
    try {
        const app = new app_1.App();
        const appServer = app.getServer().build();
        app.printRoutes();
        // connect to MongoDB
        await app.connectDB();
        services_1.Log.info('📦  MongoDB Connected!');
        // Connect to RabbitMQ
        // await publisher.init(env.amqp_url);
        // Log.info('🚎  Event Bus Publisher ready!');
        // start server
        const httpServer = http_1.default.createServer(appServer);
        httpServer.listen(env_1.default.port);
        httpServer.on('listening', () => services_1.Log.info(`🚀  ${env_1.default.service_name} listening on ` + env_1.default.port));
    }
    catch (err) {
        services_1.Log.error(err, 'Fatal server error');
    }
};
start();
//# sourceMappingURL=index.js.map