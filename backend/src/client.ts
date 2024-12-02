import { PrismaClient } from '@prisma/client';
import config from './config/config';

// add prisma to the NodeJS global type
interface CustomNodeJsGlobal extends Global {
  prisma: PrismaClient;
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;

const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      config.env === 'development'
        ? [
            // 'query',
            'info',
            'warn'
          ]
        : ['info', 'warn']
  });

if (config.env === 'development') global.prisma = prisma;

export default prisma;