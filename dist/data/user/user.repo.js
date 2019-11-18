"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bucket_1 = require("@random-guys/bucket");
const mongoose_1 = __importDefault(require("mongoose"));
const user_schema_1 = require("./user.schema");
class UserRepository extends bucket_1.BaseRepository {
    constructor(mongoose) {
        super(mongoose, 'User', user_schema_1.UserSchema);
    }
    getByAccount(account) {
        return this.byQuery({ account_number: account });
    }
}
exports.UserRepository = UserRepository;
exports.UserRepo = new UserRepository(mongoose_1.default);
//# sourceMappingURL=user.repo.js.map