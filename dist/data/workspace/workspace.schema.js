"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bucket_1 = require("@random-guys/bucket");
function NamespacedSchema(schema) {
    return Object.assign(Object.assign({}, schema), { workspace: Object.assign(Object.assign({}, bucket_1.trimmedString), { index: true, required: true }) });
}
exports.NamespacedSchema = NamespacedSchema;
//# sourceMappingURL=workspace.schema.js.map