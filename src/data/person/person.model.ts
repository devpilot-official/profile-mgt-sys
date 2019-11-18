import { Model } from '@random-guys/bucket';

export interface Person extends Model {
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
}
