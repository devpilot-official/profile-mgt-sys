"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bucket_1 = require("@random-guys/bucket");
const mongoose_1 = require("mongoose");
const workspace_1 = require("../workspace");
const TransferConstraintsSchema = {
    single: { type: mongoose_1.SchemaTypes.Boolean, default: false },
    bulk: { type: mongoose_1.SchemaTypes.Boolean, default: false },
    scheduled: { type: mongoose_1.SchemaTypes.Boolean, default: false }
};
const TranferLimitSchema = {
    local: { type: TransferConstraintsSchema },
    foreign: { type: TransferConstraintsSchema }
};
const MakerCheckerSchema = {
    can_approve: { type: mongoose_1.SchemaTypes.Boolean, default: false },
    can_initiate: { type: mongoose_1.SchemaTypes.Boolean, default: false }
};
exports.RoleSchema = workspace_1.NamespacedSchema({
    name: Object.assign(Object.assign({}, bucket_1.trimmedString), { required: true, index: true, unique: true }),
    description: bucket_1.trimmedString,
    default: { type: mongoose_1.SchemaTypes.Boolean, default: false },
    users: MakerCheckerSchema,
    workflows: MakerCheckerSchema,
    transfers: MakerCheckerSchema,
    bills: MakerCheckerSchema,
    invoices: MakerCheckerSchema,
    view_history: { type: mongoose_1.SchemaTypes.Boolean, default: false },
    generate_statement: { type: mongoose_1.SchemaTypes.Boolean, default: false },
    transfer_limit: TranferLimitSchema
});
//# sourceMappingURL=role.schema.js.map