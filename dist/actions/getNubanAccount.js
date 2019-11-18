"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const iris_1 = __importDefault(require("@random-guys/iris"));
const env_1 = __importDefault(require("@app/common/config/env"));
const session_1 = require("@app/common/services/session");
async function getNubanAccount(req, account) {
    const iReq = await session_1.getHeadlessRequest(req.session.workspace);
    const iris = new iris_1.default({ req: iReq, headless: true });
    return iris.get(`${env_1.default.proxy_url}/account/nuban/${account}`);
}
exports.default = getNubanAccount;
//# sourceMappingURL=getNubanAccount.js.map