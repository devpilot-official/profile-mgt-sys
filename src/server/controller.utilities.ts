// import { Log } from '@app/common/services';
// // import {
// //   defaultMakerChecker,
// //   defaultTransferConstraints
// // } from '@app/data/role';
// import { Session } from '@app/common/services/session';
// import { InconsistentState, InvalidOperation } from '@random-guys/pro-vcs';
// import { Controller, ControllerError } from '@random-guys/siber';
// import {
//   CONFLICT,
//   FORBIDDEN,
//   UNAUTHORIZED,
//   UNPROCESSABLE_ENTITY
// } from 'http-status-codes';

// export class ProController<T> extends Controller<T> {
//   constructor() {
//     super(Log);
//   }

//   getHTTPErrorCode(err: any) {
//     if (err instanceof InconsistentState) {
//       return CONFLICT;
//     } else if (err instanceof InvalidOperation) {
//       return UNPROCESSABLE_ENTITY;
//     }
//     return super.getHTTPErrorCode(err);
//   }
// }

// export class UnauthorizedError extends ControllerError {
//   code = UNAUTHORIZED;
//   constructor(message: string) {
//     super(message);
//   }
// }

// export class ForbiddenError extends ControllerError {
//   code = FORBIDDEN;
//   constructor(message: string) {
//     super(message);
//   }
// }

// export const debugPermissions: Session = {
//   user: 'arewaolakunle',
//   full_name: 'Olakunle Arewa',
//   role: 'admin',
//   role_name: 'myadmin',
//   workspace: 'sterlingproductorganisation',
//   users: {
//     can_initiate: true,
//     can_approve: false
//   },
//   accounts: [],
//   workflows: defaultMakerChecker,
//   bills: defaultMakerChecker,
//   transfers: defaultMakerChecker,
//   invoices: defaultMakerChecker,
//   view_history: false,
//   generate_statement: false,
//   transfer_limit: {
//     local: defaultTransferConstraints,
//     foreign: defaultTransferConstraints
//   }
// };
