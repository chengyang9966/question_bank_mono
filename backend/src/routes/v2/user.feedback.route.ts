import express from 'express';
import auth from '../../middlewares/auth';
import { Features } from '../../config/roles';
import validate from '../../middlewares/validate';
import userFeedbackController from '../../controllers/v2/user.feedback.controller';
import { userFeedbackValidation } from '../../validations';

const router = express.Router();

router
  .route('/')
  .post(
    auth(Features.createFeedbackByQuestionId),
    validate(userFeedbackValidation.createFeedback),
    userFeedbackController.createFeedbackByQuestionId
  );

router.get(
  '/:userId',
  auth(Features.getFeedbackByUserId),
  validate(userFeedbackValidation.getFeedbackByUserId),
  userFeedbackController.getFeedbackByUserId
);

export default router;
