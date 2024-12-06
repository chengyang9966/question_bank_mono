import express from 'express';
import auth from '../../../middlewares/auth';
import { Features } from '../../../config/roles';
import userFeedbackController from '../../../controllers/v2/user.feedback.controller';
import { userFeedbackValidation } from '../../../validations';
import validate from '../../../middlewares/validate';

const router = express.Router();

router
  .route('/')
  .get(
    auth(Features.getFeedbacks),
    validate(userFeedbackValidation.getFeedbacks),
    userFeedbackController.getFeedbacks
  );

export default router;
