import 'module-alias/register';
import 'reflect-metadata';
// import { publisher } from '@random-guys/eventbus';
import http from 'http';
import env from './common/config/env';
import { Log } from './common/services';
import { App } from './server/app';


const start = async () => {
  try {
    const app = new App();
    const appServer = app.getServer().build();
    app.printRoutes();

    // connect to MongoDB
    await app.connectDB();
    Log.info('📦  MongoDB Connected!');

    // Connect to RabbitMQ
    // await publisher.init(env.amqp_url);
    // Log.info('🚎  Event Bus Publisher ready!');

    // start server
    const httpServer = http.createServer(appServer);
    httpServer.listen(env.port);
    httpServer.on('listening', () =>
      Log.info(`🚀  ${env.service_name} listening on ` + env.port)
    );
  } catch (err) {
    Log.error(err, 'Fatal server error');
  }
};

start();
