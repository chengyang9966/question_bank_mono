import express from 'express';
import auth from '../../middlewares/auth';
import { Features } from '../../config/roles';
import { userSessionValidation } from '../../validations';
import validate from '../../middlewares/validate';
import { userSessionV2Controller } from '../../controllers/v2';

const router = express.Router();

router
  .route('/:userId')
  .post(
    auth(Features.createSession),
    validate(userSessionValidation.createUserSessionQuestions),
    userSessionV2Controller.createUserSessionByUserId
  )
  .put(
    auth(Features.updateSessionsByUserId),
    validate(userSessionValidation.updateSessionByUser),
    userSessionV2Controller.putUserSessionByUserId
  )
  .get(
    auth(Features.getAllSessions),
    validate(userSessionValidation.getUserSessionsByUserId),
    userSessionV2Controller.getUserSessionByUserId
  );

export default router;
