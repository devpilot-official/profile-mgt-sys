"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const siber_1 = require("@random-guys/siber");
const env = siber_1.autoloadEnv(siber_1.siberConfig(Object.assign(Object.assign(Object.assign({}, siber_1.mongoConfig), siber_1.redisConfig), { amqp_url: joi_1.default.string().required(), mail_sender_address: joi_1.default.string().required(), role_port: joi_1.default.number().required(), proxy_url: joi_1.default
        .string()
        .uri()
        .required(), client_password_page: joi_1.default
        .string()
        .uri()
        .required(), sendgrid_key: joi_1.default.string().required() })));
exports.default = env;
//# sourceMappingURL=env.js.map