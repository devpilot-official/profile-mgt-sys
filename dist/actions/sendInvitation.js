// import env from '@app/common/config/env';
// import { Mailer } from '@app/common/services';
// import { Person } from '@app/data/person';
// import { newUserLoginMail } from '@random-guys/pro-mails';
// import { seal } from '@random-guys/sp-auth';
// export default async function sendInvitation(user: Person, workspace: string) {
//   const token = await seal({ user: user.id }, env.service_secret, '10min');
//   return Mailer.send({
//     from: env.mail_sender_address,
//     to: user.email_address,
//     subject: 'Setup Account',
//     html: await newUserLoginMail({
//       firstname: user.first_name,
//       company: workspace,
//       setup_route: `${env.client_password_page}/${token}`
//     })
//   });
// }
//# sourceMappingURL=sendInvitation.js.map