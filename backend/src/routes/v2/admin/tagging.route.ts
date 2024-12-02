import express from 'express';
import validate from '../../../middlewares/validate';
import { questionsValidation } from '../../../validations';
import { adminV2Controller } from '../../../controllers/v2';
import auth from '../../../middlewares/auth';
import { Features } from '../../../config/roles';

const router = express.Router();

router
  .route('/')
  .post(
    auth(Features.createQuestionsTagging),
    validate(questionsValidation.createTagging),
    adminV2Controller.createQuestionsTagging
  )
  .get(auth(Features.getQuestionsTagging), adminV2Controller.getAllQuestionsTagging);

// router.route('/search').get(adminV2Controller.getQuestionsByTaggingIdOrTitle);

export default router;
