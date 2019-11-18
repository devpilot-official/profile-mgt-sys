import env from '@app/common/config/env';
import Iris from '@random-guys/iris';
import { SendGridMailer } from '@random-guys/pro-mails';
import {
  createRequestSerializer,
  errSerializer,
  resSerializer
} from '@random-guys/siber';
import { RedisStore, session } from '@random-guys/sp-auth';
import Logger, { createLogger } from 'bunyan';
import IORedis from 'ioredis';

export const Log: Logger = createLogger({
  name: env.service_name,
  serializers: {
    err: errSerializer,
    res: resSerializer,
    req: createRequestSerializer('password')
  }
});

export const Store = new IORedis(
  env.redis_url,
  env.node_env === 'dev'
    ? undefined
    : {
        password: env.redis_password
      }
);
Store.on('ready', () => Log.info('🐳  Redis Connected!'));
Store.on('error', err =>
  Log.error(err, 'An error occured with the Redis client.')
);

export const Auth = session({
  store: new RedisStore(Store),
  secret: env.service_secret,
  cookie: {
    httpOnly: true,
    secure: env.node_env !== 'dev',
    maxAge: 600000 // 10 mins
  }
});

export const Mailer = new SendGridMailer(env.sendgrid_key);

Iris.bootstrap(env.service_name, env.auth_scheme);
