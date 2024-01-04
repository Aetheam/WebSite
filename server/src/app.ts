import { join } from 'path';
import AutoLoad, {AutoloadPluginOptions} from '@fastify/autoload';
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify';
import { fastifyStatic } from '@fastify/static';
import fastifyJwt from '@fastify/jwt';
import fastifyAuth from '@fastify/auth';
import fastifyCors from '@fastify/cors';

import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
export interface AppOptions extends FastifyServerOptions, Partial<AutoloadPluginOptions> {

}
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {
  logger: false,
}

const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {
  void fastify.register(fastifyJwt, {
    secret: "a!7jey-ddd"
  })
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  })

  void fastify.register(fastifyAuth)
  void fastify.register(fastifyCors, {
    origin: (origin, cb) => {
      if(origin=== undefined) return cb(null, true)
      const hostname = new URL(origin).hostname
      if(hostname === "localhost"){
        console.log("localhost")
      
        cb(null, true)
        return
      }
      // Generate an error on other origins, disabling access
      cb(new Error("Not allowed"), false)
    },
    
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts
  })

  void fastify.register(fastifyStatic, {
    root: join(__dirname, 'public'),
    prefix: '/public/',
    index: false,
    list: true
  })
};

export default app;
export { app, options }
