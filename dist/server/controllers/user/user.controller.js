"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@app/common/services");
const user_1 = require("@app/data/user");
const siber_1 = require("@random-guys/siber");
const inversify_express_utils_1 = require("inversify-express-utils");
const user_validator_1 = require("./user.validator");
const sendInvitation_1 = __importDefault(require("@app/actions/sendInvitation"));
const getNubanAccount_1 = __importDefault(require("@app/actions/getNubanAccount"));
let UserController = class UserController extends siber_1.Controller {
    constructor() {
        super(services_1.Log);
    }
    async createAuthorization(req, res, body) {
        try {
            const account = await getNubanAccount_1.default(req, body.account_number);
            const [firstName, lastName] = account.account_name.split(' ');
            let user = await user_1.UserRepo.create({
                account_number: body.account_number,
                first_name: firstName,
                last_name: lastName
            });
            await sendInvitation_1.default(user, 'My Workspace');
            this.handleSuccess(req, res, user);
        }
        catch (err) {
            this.handleError(req, res, err);
        }
    }
    async confirmSingleSignatory(req, res, userId, body) {
        try {
            let user = await user_1.UserRepo.atomicUpdate(userId, body);
            this.handleSuccess(req, res, user);
        }
        catch (err) {
            this.handleError(req, res, err);
        }
    }
};
__decorate([
    inversify_express_utils_1.httpPost('/', siber_1.validate(user_validator_1.isUserDTO)),
    __param(0, inversify_express_utils_1.request()),
    __param(1, inversify_express_utils_1.response()),
    __param(2, inversify_express_utils_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, typeof (_a = typeof user_1.UserDTO !== "undefined" && user_1.UserDTO) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createAuthorization", null);
__decorate([
    inversify_express_utils_1.httpPut('/:id', siber_1.validate(user_validator_1.isUser)),
    __param(0, inversify_express_utils_1.request()),
    __param(1, inversify_express_utils_1.response()),
    __param(2, inversify_express_utils_1.requestParam('id')),
    __param(3, inversify_express_utils_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, typeof (_b = typeof user_1.User !== "undefined" && user_1.User) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "confirmSingleSignatory", null);
UserController = __decorate([
    inversify_express_utils_1.controller('/user'),
    __metadata("design:paramtypes", [])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map