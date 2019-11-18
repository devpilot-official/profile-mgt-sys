"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bucket_1 = require("@random-guys/bucket");
exports.UserSchema = bucket_1.SchemaFactory({
    first_name: Object.assign(Object.assign({}, bucket_1.trimmedString), { required: true, index: true }),
    last_name: Object.assign(Object.assign({}, bucket_1.trimmedString), { required: true, index: true }),
    account_number: Object.assign(Object.assign({}, bucket_1.trimmedString), { index: true, required: true, unique: true })
});
//# sourceMappingURL=user.schema.js.map