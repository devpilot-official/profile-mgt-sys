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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@app/common/services");
const role_1 = require("@app/data/role");
const role_model_1 = require("@app/data/role/role.model");
const controller_utilities_1 = require("@app/server/controller.utilities");
const pro_vcs_1 = require("@random-guys/pro-vcs");
const siber_1 = require("@random-guys/siber");
const inversify_express_utils_1 = require("inversify-express-utils");
const capitalize_1 = __importDefault(require("lodash/capitalize"));
const role_middleware_1 = require("./role.middleware");
const role_validator_1 = require("./role.validator");
let RoleController = class RoleController extends controller_utilities_1.ProController {
    async login(req, res) {
        try {
            await services_1.Auth.create(res, controller_utilities_1.debugPermissions.user, controller_utilities_1.debugPermissions);
            this.handleSuccess(req, res, {
                // @ts-ignore
                token: await services_1.Auth.headless(controller_utilities_1.debugPermissions)
            });
        }
        catch (err) {
            this.handleError(req, res, err);
        }
    }
    async createRole(req, res, body) {
        try {
            role_model_1.validatePermissionStructure(body, body.name);
            const role = await role_1.RoleRepo.restrictedCreate(req.session.user, req.session.workspace, body);
            this.handleSuccess(req, res, role);
        }
        catch (err) {
            this.handleError(req, res, err);
        }
    }
    async createDefaultRole(req, res, workspace, body) {
        try {
            role_model_1.validatePermissionStructure(body, body.name);
            const role = await role_1.RoleRepo.internalRepo.create(Object.assign(Object.assign({ object_state: pro_vcs_1.ObjectState.stable, default: true }, body), { workspace: workspace }));
            this.handleSuccess(req, res, role.toObject());
        }
        catch (err) {
            this.handleError(req, res, err);
        }
    }
    async getRoles(req, res, query) {
        try {
            this.handleSuccess(req, res, await role_1.RoleRepo.restrictedAll(req.session.user, req.session.workspace, {
                conditions: {
                    default: query.default
                }
            }, query.fresh));
        }
        catch (err) {
            this.handleError(req, res, err);
        }
    }
    async getRole(req, res, id) {
        try {
            this.handleSuccess(req, res, await role_1.RoleRepo.restrictedGet(req.session.user, req.session.workspace, id));
        }
        catch (err) {
            this.handleError(req, res, err);
        }
    }
    async updateRole(req, res, id, body) {
        try {
            const insecureModule = role_1.findSecurityRisk(body);
            if (insecureModule) {
                const name = capitalize_1.default(insecureModule);
                throw new siber_1.ConstraintError(`${body.name} cannot have initiate & approve permissions on ${name}`);
            }
            role_model_1.ensureProperTransferPermissions(body);
            this.handleSuccess(req, res, await role_1.RoleRepo.update(req.session.user, id, body));
        }
        catch (err) {
            this.handleError(req, res, err);
        }
    }
    async deleteRole(req, res, id, body) {
        try {
            this.handleSuccess(req, res, await role_1.RoleRepo.delete(req.session.user, id));
        }
        catch (err) {
            this.handleError(req, res, err);
        }
    }
};
__decorate([
    inversify_express_utils_1.httpPost('/session'),
    __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "login", null);
__decorate([
    inversify_express_utils_1.httpPost('/', role_middleware_1.canCreate, siber_1.validate(role_validator_1.isRole)),
    __param(0, inversify_express_utils_1.request()),
    __param(1, inversify_express_utils_1.response()),
    __param(2, inversify_express_utils_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, typeof (_a = typeof role_1.RoleDTO !== "undefined" && role_1.RoleDTO) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "createRole", null);
__decorate([
    inversify_express_utils_1.httpPost('/default/:workspace', siber_1.validate(role_validator_1.isRole)),
    __param(0, inversify_express_utils_1.request()),
    __param(1, inversify_express_utils_1.response()),
    __param(2, inversify_express_utils_1.requestParam('workspace')),
    __param(3, inversify_express_utils_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, typeof (_b = typeof role_1.RoleDTO !== "undefined" && role_1.RoleDTO) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "createDefaultRole", null);
__decorate([
    inversify_express_utils_1.httpGet('/', role_middleware_1.canView, siber_1.validate(role_validator_1.isRoleQuery, 'query')),
    __param(0, inversify_express_utils_1.request()),
    __param(1, inversify_express_utils_1.response()),
    __param(2, inversify_express_utils_1.queryParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, typeof (_c = typeof role_1.RoleQuery !== "undefined" && role_1.RoleQuery) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getRoles", null);
__decorate([
    inversify_express_utils_1.httpGet('/:id', role_middleware_1.canView),
    __param(0, inversify_express_utils_1.request()),
    __param(1, inversify_express_utils_1.response()),
    __param(2, inversify_express_utils_1.requestParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getRole", null);
__decorate([
    inversify_express_utils_1.httpPut('/:id', role_middleware_1.canCreate, siber_1.validate(role_validator_1.isRole)),
    __param(0, inversify_express_utils_1.request()),
    __param(1, inversify_express_utils_1.response()),
    __param(2, inversify_express_utils_1.requestParam('id')),
    __param(3, inversify_express_utils_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, typeof (_d = typeof role_1.RoleDTO !== "undefined" && role_1.RoleDTO) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "updateRole", null);
__decorate([
    inversify_express_utils_1.httpDelete('/:id', role_middleware_1.canCreate),
    __param(0, inversify_express_utils_1.request()),
    __param(1, inversify_express_utils_1.response()),
    __param(2, inversify_express_utils_1.requestParam('id')),
    __param(3, inversify_express_utils_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, typeof (_e = typeof role_1.RoleDTO !== "undefined" && role_1.RoleDTO) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "deleteRole", null);
RoleController = __decorate([
    inversify_express_utils_1.controller('/role')
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map