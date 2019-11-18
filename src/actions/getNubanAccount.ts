import { Request } from 'express';
import Iris from '@random-guys/iris';
import env from '@app/common/config/env';
import { getHeadlessRequest } from '@app/common/services/session';

export default async function getNubanAccount(req: Request, account: string) {
  const iReq = await getHeadlessRequest(req.session.workspace);
  const iris = new Iris({ req: iReq, headless: true });
  return iris.get<NubanAccount>(`${env.proxy_url}/account/nuban/${account}`);
}

export interface NubanAccount {
  account_name: string;
  account_number: string;
  ledger_name: string;
  bvn: string;
  customer_id: string;
  is_corporate_account: boolean;
  account_status: 'active';
  currency: string;
  email_address: string;
  phone_number: string;
}
