"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@app/common/services");
const v4_1 = __importDefault(require("uuid/v4"));
const env_1 = __importDefault(require("../config/env"));
async function getHeadlessRequest(workspace) {
    const token = await services_1.Auth.headless({
        user: 'everyone',
        workspace: workspace
    });
    return {
        id: v4_1.default(),
        headers: {
            authorization: `${env_1.default.auth_scheme} ${token}`
        }
    };
}
exports.getHeadlessRequest = getHeadlessRequest;
//# sourceMappingURL=session.js.map