import joi from '@hapi/joi';
import { MongoConfig } from '@random-guys/bucket';
import {
  AppConfig,
  autoloadEnv,
  mongoConfig,
  redisConfig,
  RedisConfig,
  siberConfig
} from '@random-guys/siber';

const env = autoloadEnv<ProfileServiceConfig>(
  siberConfig({
    ...mongoConfig,
    ...redisConfig,
    amqp_url: joi.string().required(),
    mail_sender_address: joi.string().required(),
    role_port: joi.number().required(),
    proxy_url: joi
      .string()
      .uri()
      .required(),
    client_password_page: joi
      .string()
      .uri()
      .required(),
    sendgrid_key: joi.string().required()
  })
);

export interface ProfileServiceConfig extends AppConfig, MongoConfig, RedisConfig {
  amqp_url: string;
  client_password_page: string;
  mail_sender_address: string;
  role_port: number;
  proxy_url: string;
  sendgrid_key: string;
}

export default env;
