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
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@app/common/services");
const person_1 = require("@app/data/person");
const siber_1 = require("@random-guys/siber");
const inversify_express_utils_1 = require("inversify-express-utils");
let PersonController = class PersonController extends siber_1.Controller {
    constructor() {
        super(services_1.Log);
    }
    async createAuthorization(req, res) {
        try {
            let person = await person_1.PersonRepo.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                phonenumber: req.body.phonenumber
            });
            this.handleSuccess(req, res, person);
        }
        catch (err) {
            this.handleError(req, res, err);
        }
    }
    async createAccess(req, res) {
        try {
            let username = req.body.username;
            let person = await person_1.PersonRepo.byQuery({ email: username }, { 'created_at': false });
            this.handleSuccess(req, res, person);
        }
        catch (err) {
            this.handleError(req, res, err);
        }
    }
    async confirmSingleSignatory(req, res, PersonId, body) {
        try {
            let person = await person_1.PersonRepo.atomicUpdate(PersonId, body);
            this.handleSuccess(req, res, person);
        }
        catch (err) {
            this.handleError(req, res, err);
        }
    }
};
__decorate([
    inversify_express_utils_1.httpPost('/'),
    __param(0, inversify_express_utils_1.request()),
    __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PersonController.prototype, "createAuthorization", null);
__decorate([
    inversify_express_utils_1.httpPost('/login'),
    __param(0, inversify_express_utils_1.request()),
    __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PersonController.prototype, "createAccess", null);
__decorate([
    inversify_express_utils_1.httpPut('/:id'),
    __param(0, inversify_express_utils_1.request()),
    __param(1, inversify_express_utils_1.response()),
    __param(2, inversify_express_utils_1.requestParam('id')),
    __param(3, inversify_express_utils_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, Object]),
    __metadata("design:returntype", Promise)
], PersonController.prototype, "confirmSingleSignatory", null);
PersonController = __decorate([
    inversify_express_utils_1.controller('/Person'),
    __metadata("design:paramtypes", [])
], PersonController);
exports.PersonController = PersonController;
//# sourceMappingURL=person.controller.js.map