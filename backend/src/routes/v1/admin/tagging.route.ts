import express from 'express';
import validate from '../../../middlewares/validate';
import { questionsValidation } from '../../../validations';
import { adminController } from '../../../controllers';

const router = express.Router();

router
  .route('/')
  .post(validate(questionsValidation.createTagging), adminController.createTagging)
  .get(adminController.getAllTagging);

router.route('/search').get(adminController.getQuestionsByTaggingIdOrTitle);

export default router;
