import express from 'express';
import adminTaggingRoute from './admin/tagging.route';
import authRoute from './admin/auth.route';
import questionsRoute from './admin/questions.route';
import referencesRoute from './admin/reference.route';
import userSessionRoute from './user.session.route';
import userTaggingRoute from './tagging.route';
import userQuestionRoute from './user.question.route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/admin/tagging',
    route: adminTaggingRoute
  },
  {
    path: '/admin/auth',
    route: authRoute
  },
  {
    path: '/admin/questions',
    route: questionsRoute
  },
  {
    path: '/admin/reference',
    route: referencesRoute
  },
  {
    path: '/user/session',
    route: userSessionRoute
  },
  {
    path: '/user/tagging',
    route: userTaggingRoute
  },
  {
    path: '/user/question',
    route: userQuestionRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
