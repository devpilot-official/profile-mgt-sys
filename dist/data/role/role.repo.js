"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const role_schema_1 = require("./role.schema");
const workspace_1 = require("../workspace/");
exports.RoleRepo = new workspace_1.NamespacedRepository(mongoose_1.default, 'Role', role_schema_1.RoleSchema);
//# sourceMappingURL=role.repo.js.map