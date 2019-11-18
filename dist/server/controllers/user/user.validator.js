"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
exports.isAccountNumber = joi_1.default.string().trim().regex(/\d+/).length(10);
exports.isUser = joi_1.default.object({
    first_name: joi_1.default.string().trim(),
    last_name: joi_1.default.string().trim(),
    account_number: exports.isAccountNumber
});
exports.isUserDTO = joi_1.default.object({
    account_number: exports.isAccountNumber
});
//# sourceMappingURL=user.validator.js.map