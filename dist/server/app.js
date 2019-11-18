"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("@app/common/config/env"));
const ioc_1 = __importDefault(require("@app/common/config/ioc"));
const services_1 = require("@app/common/services");
// import { androidBuild } from '@app/server/middleware';
const bucket_1 = require("@random-guys/bucket");
const siber_1 = require("@random-guys/siber");
const inversify_express_utils_1 = require("inversify-express-utils");
const mongoose_1 = __importDefault(require("mongoose"));
class App {
    constructor() {
        this.getServer = () => this.server;
        this.server = new inversify_express_utils_1.InversifyExpressServer(ioc_1.default, null, {
            rootPath: env_1.default.api_version
        });
        // setup server-level middlewares
        this.server.setConfig((app) => {
            app.disable('x-powered-by'); // move this to siber
            siber_1.build(app, services_1.Log, {
                cors: true,
                tracking: true
            });
            // automatically load sessions
            app.use(services_1.Auth.autoload(services_1.Log));
            // android build number
            // app.use(androidBuild);
        });
        /**
         * Register handlers after all middlewares and controller routes have been mounted
         */
        this.server.setErrorConfig((app) => {
            // expose index endpoint
            app.get('/', (req, res) => {
                res.status(200).send('Up and running');
                services_1.Log.info({ req, res });
            });
            // register 404 route handler
            app.use((req, res, _next) => {
                res.status(404).send("Whoops! Route doesn't exist.");
                services_1.Log.info({ req, res });
            });
        });
    }
    printRoutes() {
        const routeInfo = inversify_express_utils_1.getRouteInfo(ioc_1.default);
        console.log(JSON.stringify(routeInfo));
    }
    async connectDB() {
        await mongoose_1.default.connect(env_1.default.mongodb_url, Object.assign({}, (env_1.default.node_env === 'dev' ? bucket_1.defaultMongoOpts : bucket_1.secureMongoOpts(env_1.default))));
        this.db = mongoose_1.default.connection;
    }
    /**
     * Closes MongoDB and Redis connections.
     */
    async closeDB() {
        await mongoose_1.default.disconnect();
        await services_1.Store.quit();
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map