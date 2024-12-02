import { Features } from '../../config/roles';
import { questionV2Controller } from '../../controllers/v2';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { questionSessionValidation } from '../../validations';
import express from 'express';

const router = express.Router();

router
  .route('/:sessionId')
  .get(
    auth(Features.getSessionsById),
    validate(questionSessionValidation.getQuestionSessionsBySessionId),
    questionV2Controller.getQuestionSessionBySessionId
  );

export default router;
