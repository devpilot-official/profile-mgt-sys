"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
exports.isAccountNumber = joi_1.default
    .string()
    .trim()
    .regex(/\d+/)
    .length(10);
exports.isQuery = joi_1.default.object({
    fresh: joi_1.default.bool().default(true)
});
exports.isEmail = joi_1.default
    .string()
    .trim()
    .regex(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
//# sourceMappingURL=validator.utilities.js.map