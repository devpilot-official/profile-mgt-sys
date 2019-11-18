"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bucket_1 = require("@random-guys/bucket");
const mongoose_1 = __importDefault(require("mongoose"));
const person_schema_1 = require("./person.schema");
class PersonRepository extends bucket_1.BaseRepository {
    constructor(mongoose) {
        super(mongoose, 'User', person_schema_1.PersonSchema);
    }
    getByAccount(account) {
        return this.byQuery({ account_number: account });
    }
}
exports.PersonRepository = PersonRepository;
exports.PersonRepo = new PersonRepository(mongoose_1.default);
//# sourceMappingURL=person.repo.js.map