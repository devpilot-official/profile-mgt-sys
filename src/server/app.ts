import env from '@app/common/config/env';
import container from '@app/common/config/ioc';
import { Auth, Log, Store } from '@app/common/services';
// import { androidBuild } from '@app/server/middleware';
import { defaultMongoOpts, secureMongoOpts } from '@random-guys/bucket';
import { build } from '@random-guys/siber';
import { Application } from 'express';
import { getRouteInfo, InversifyExpressServer } from 'inversify-express-utils';
import mongoose, { Connection } from 'mongoose';

export class App {

  db: Connection;
  private server: InversifyExpressServer;

  constructor() {
    
    this.server = new InversifyExpressServer(container, null, {
      rootPath: env.api_version
    });

    // setup server-level middlewares
    this.server.setConfig((app: Application) => {
      app.disable('x-powered-by'); // move this to siber

      build(app, Log, {
        cors: true,
        tracking: true
      });

      // automatically load sessions
      app.use(Auth.autoload(Log));

      // android build number
      // app.use(androidBuild);
    });

    /**
     * Register handlers after all middlewares and controller routes have been mounted
     */
    this.server.setErrorConfig((app: Application) => {
      // expose index endpoint
      app.get('/', (req, res) => {
        res.status(200).send('Up and running');
        Log.info({ req, res });
      });

      // register 404 route handler
      app.use((req, res, _next) => {
        res.status(404).send("Whoops! Route doesn't exist.");
        Log.info({ req, res });
      });
    });
  }

  printRoutes() {
    const routeInfo = getRouteInfo(container);
    console.log(JSON.stringify(routeInfo));
  }

  getServer = () => this.server;

  async connectDB() {
    await mongoose.connect(env.mongodb_url, {
      ...(env.node_env === 'dev' ? defaultMongoOpts : secureMongoOpts(env))
    });
    this.db = mongoose.connection;
  }

  /**
   * Closes MongoDB and Redis connections.
   */
  async closeDB() {
    await mongoose.disconnect();
    await Store.quit();
  }
}
