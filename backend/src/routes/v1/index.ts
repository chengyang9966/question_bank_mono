import express from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';
import adminTaggingRoute from './admin/tagging.route';
import adminQuestionsRoute from './admin/questions.route';
import adminReferencesRoute from './admin/reference.route';
import docsRoute from './docs.route';
import publicUserRoute from './publicUser.route';
import publicSessionRoute from './publicSession.route';
import publicUserSessionRoute from './publicUserSession.route';
import config from '../../config/config';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/api/v1/auth',
    route: authRoute
  },
  {
    path: '/api/v1/users',
    route: userRoute
  },
  {
    path: '/api/v1/admin/questions',
    route: adminQuestionsRoute
  },
  {
    path: '/api/v1/admin/reference',
    route: adminReferencesRoute
  },
  {
    path: '/api/v1/admin/tagging',
    route: adminTaggingRoute
  },
  {
    path: '/api/v1/publicUser',
    route: publicUserRoute
  },
  {
    path: '/api/v1/publicSession',
    route: publicSessionRoute
  },
  {
    path: '/api/v1/publicUserSession',
    route: publicUserSessionRoute
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
