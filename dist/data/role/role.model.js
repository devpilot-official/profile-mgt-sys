"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const capitalize_1 = __importDefault(require("lodash/capitalize"));
const findKey_1 = __importDefault(require("lodash/findKey"));
const pick_1 = __importDefault(require("lodash/pick"));
const siber_1 = require("@random-guys/siber");
exports.defaultMakerChecker = {
    can_approve: false,
    can_initiate: false
};
exports.defaultTransferConstraints = {
    single: false,
    bulk: false,
    scheduled: false
};
exports.reviewDrivenPermissionKeys = [
    'users',
    'workflows',
    'transfers',
    'bills',
    'invoices'
];
/**
 * Extract permissions from a role.
 * @param role role to extract from
 */
function extractPermissions(role) {
    // @ts-ignore they are required in roles
    return pick_1.default(role, 'view_history', 'generate_statement', 'transfer_limit', ...exports.reviewDrivenPermissionKeys);
}
exports.extractPermissions = extractPermissions;
/**
 * Find an object with both intiaite and approve permissions
 * @param permissions a set of permissions
 */
function findSecurityRisk(permissions) {
    const reviewDriverPermissions = pick_1.default(permissions, ...exports.reviewDrivenPermissionKeys);
    return findKey_1.default(reviewDriverPermissions, (o) => {
        return isSecurityRisk(o);
    });
}
exports.findSecurityRisk = findSecurityRisk;
/**
 * Ensure that a user that can initiate/approve transfers can at least do
 * so for single local transfers
 * @param permissions a set of user permissions
 */
function ensureProperTransferPermissions(permissions) {
    const involvedInTransfers = permissions.transfers.can_approve || permissions.transfers.can_initiate;
    const hasRestrictions = isRestricted(permissions.transfer_limit.local) ||
        isRestricted(permissions.transfer_limit.foreign);
    if (involvedInTransfers && !hasRestrictions) {
        permissions.transfer_limit.local = {
            single: true,
            bulk: false,
            scheduled: false
        };
    }
}
exports.ensureProperTransferPermissions = ensureProperTransferPermissions;
function validatePermissionStructure(permissions, actor) {
    const insecureModule = findSecurityRisk(permissions);
    if (insecureModule) {
        const name = capitalize_1.default(insecureModule);
        throw new siber_1.ConstraintError(`${actor} cannot have initiate & approve permissions on ${name}`);
    }
    ensureProperTransferPermissions(permissions);
}
exports.validatePermissionStructure = validatePermissionStructure;
function isSecurityRisk(permission) {
    return permission.can_approve && permission.can_initiate;
}
function isRestricted(constraints) {
    return constraints.single || constraints.bulk || constraints.scheduled;
}
//# sourceMappingURL=role.model.js.map