"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const role_1 = require("@app/data/role");
const joi_1 = __importDefault(require("@hapi/joi"));
exports.isMakerChecker = joi_1.default.object({
    can_approve: joi_1.default.bool().default(false),
    can_initiate: joi_1.default.bool().default(false)
});
exports.isTransferConstraint = joi_1.default.object({
    single: joi_1.default.bool(),
    bulk: joi_1.default.bool(),
    scheduled: joi_1.default.bool()
});
exports.isPermission = {
    users: exports.isMakerChecker.required(),
    workflows: exports.isMakerChecker.required(),
    bills: exports.isMakerChecker.required(),
    invoices: exports.isMakerChecker.required(),
    transfers: exports.isMakerChecker.required(),
    view_history: joi_1.default.bool().default(false),
    generate_statement: joi_1.default.bool().default(false),
    transfer_limit: joi_1.default
        .object({
        local: exports.isTransferConstraint.default(role_1.defaultTransferConstraints),
        foreign: exports.isTransferConstraint.default(role_1.defaultTransferConstraints)
    })
        .required()
};
exports.isRole = joi_1.default.object(Object.assign({ name: joi_1.default
        .string()
        .trim()
        .required(), description: joi_1.default.string().trim() }, exports.isPermission));
exports.isRoleQuery = joi_1.default.object({
    name: joi_1.default.string().trim(),
    default: joi_1.default.boolean().default(false)
});
//# sourceMappingURL=role.validator.js.map