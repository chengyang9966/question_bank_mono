import express from 'express';
import validate from '../../middlewares/validate';
import { publicUserSessionValidation } from '../../validations';
import { publicUserSessionController } from '../../controllers';

const router = express.Router();
router
  .route('/')
  .post(
    validate(publicUserSessionValidation.updatePublicUserSession),
    publicUserSessionController.createQuestionsForPublicUserSessionBySessionId
  );
//   .get(validate(publicUserValidation.getPublicUsers), publicUserController.getPubicUsers);

router
  .route('/:userId')
  .post(
    validate(publicUserSessionValidation.getPublicUser),
    publicUserSessionController.createPublicUserSessionByUserId
  );

export default router;
