import { Auth } from '@app/common/services';
import { RequestContract } from '@random-guys/iris';
import uuid from 'uuid/v4';
import env from '../config/env';

export interface Session {
  user: string;
  full_name: string;
  role: string;
  role_name: string;
  workspace: string;
  accounts: Account[];
  users: MakerChecker;
  workflows: MakerChecker;
  transfers: MakerChecker;
  bills: MakerChecker;
  invoices: MakerChecker;
  view_history: boolean;
  generate_statement: boolean;
  transfer_limit: {
    local: TransferConstraints;
    foreign: TransferConstraints;
  };
}

export interface MakerChecker {
  can_approve: boolean;
  can_initiate: boolean;
}

export interface TransferConstraints {
  single: boolean;
  bulk: boolean;
  scheduled: boolean;
}

export interface Account {
  acccount_number: string;
  account_name: string;
  account_ledger: string;
  currency: string;
  max_amount: number;
  min_amount: number;
}

export async function getHeadlessRequest(
  workspace: string
): Promise<RequestContract> {
  const token = await Auth.headless({
    user: 'everyone',
    workspace: workspace
  });
  return {
    id: uuid(),
    headers: {
      authorization: `${env.auth_scheme} ${token}`
    }
  };
}
