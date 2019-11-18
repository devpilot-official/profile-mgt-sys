"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("@app/common/config/env"));
const iris_1 = __importDefault(require("@random-guys/iris"));
const pro_mails_1 = require("@random-guys/pro-mails");
const siber_1 = require("@random-guys/siber");
const sp_auth_1 = require("@random-guys/sp-auth");
const bunyan_1 = require("bunyan");
const ioredis_1 = __importDefault(require("ioredis"));
exports.Log = bunyan_1.createLogger({
    name: env_1.default.service_name,
    serializers: {
        err: siber_1.errSerializer,
        res: siber_1.resSerializer,
        req: siber_1.createRequestSerializer('password')
    }
});
exports.Store = new ioredis_1.default(env_1.default.redis_url, env_1.default.node_env === 'dev'
    ? undefined
    : {
        password: env_1.default.redis_password
    });
exports.Store.on('ready', () => exports.Log.info('🐳  Redis Connected!'));
exports.Store.on('error', err => exports.Log.error(err, 'An error occured with the Redis client.'));
exports.Auth = sp_auth_1.session({
    store: new sp_auth_1.RedisStore(exports.Store),
    secret: env_1.default.service_secret,
    cookie: {
        httpOnly: true,
        secure: env_1.default.node_env !== 'dev',
        maxAge: 600000 // 10 mins
    }
});
exports.Mailer = new pro_mails_1.SendGridMailer(env_1.default.sendgrid_key);
iris_1.default.bootstrap(env_1.default.service_name, env_1.default.auth_scheme);
//# sourceMappingURL=index.js.map