"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bucket_1 = require("@random-guys/bucket");
exports.PersonSchema = bucket_1.SchemaFactory({
    firstname: Object.assign(Object.assign({}, bucket_1.trimmedString), { required: true, index: true }),
    lastname: Object.assign(Object.assign({}, bucket_1.trimmedString), { required: true, index: true }),
    email: Object.assign(Object.assign({}, bucket_1.trimmedString), { index: true, required: true, unique: true }),
    phonenumber: Object.assign(Object.assign({}, bucket_1.trimmedString), { index: true, required: true, unique: true })
});
//# sourceMappingURL=person.schema.js.map