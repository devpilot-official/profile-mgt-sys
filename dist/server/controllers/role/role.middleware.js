"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@app/common/services");
const siber_1 = require("@random-guys/siber");
const sp_auth_1 = require("@random-guys/sp-auth");
exports.canCreate = siber_1.compose(services_1.Auth.authCheck, sp_auth_1.when(req => {
    return req.session.users.can_initiate;
}));
exports.canView = siber_1.compose(services_1.Auth.authCheck, sp_auth_1.when(req => {
    return req.session.users.can_initiate || req.session.users.can_approve;
}));
//# sourceMappingURL=role.middleware.js.map