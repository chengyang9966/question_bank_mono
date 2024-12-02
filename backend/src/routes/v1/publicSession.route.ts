import express from 'express';
import validate from '../../middlewares/validate';
import { publicUserSessionController } from '../../controllers';
import { publicUserSessionValidation } from '../../validations';

const router = express.Router();

// router
//   .route('/')
//   .post(
//     validate(publicSessionValidation.updatePublicUserSession),
//     publicUserSessionController.createQuestionsForPublicUserSessionBySessionId
//   );

router
  .route('/:sessionId')
  .post(
    validate(publicUserSessionValidation.updateAnswerPublicSession),
    publicUserSessionController.createAnswerBySessionId
  )
  .get(
    validate(publicUserSessionValidation.getPublicUserBySessionId),
    publicUserSessionController.getPublicUserSessionByUserId
  );

export default router;
