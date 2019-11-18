// import 'module-alias/register';
// import 'reflect-metadata';
// import env from '@app/common/config/env';
// import { Role, RoleRepo } from '@app/data/role';
// import { Check, createWorker, ICanMerge } from '@random-guys/pro-vcs';
// import { Request } from 'express';
// class RoleMerger implements ICanMerge<Role> {
//   async onApprove(req: Request, reference: string): Promise<void> {
//     await RoleRepo.merge(reference);
//   }
//   async onReject(req: Request, reference: string): Promise<void> {
//     await RoleRepo.reject(reference);
//   }
//   onCheck(req: Request, reference: string): Promise<Check[]> {
//     return Promise.resolve([]);
//   }
// }
// createWorker(new RoleMerger(), {
//   name: RoleRepo.name,
//   security_secret: env.service_secret,
//   security_scheme: env.auth_scheme,
//   app_port: env.role_port,
//   secure_db: env.node_env !== 'dev',
//   mongodb_username: env.mongodb_username,
//   mongodb_password: env.mongodb_password,
//   mongodb_url: env.mongodb_url
// });
//# sourceMappingURL=role.merger.js.map