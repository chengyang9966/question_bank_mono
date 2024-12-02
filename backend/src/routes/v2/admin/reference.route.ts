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
    auth(Features.createReference),
    validate(questionsValidation.createReferences),
    adminV2Controller.createQuestionsReference
  )
  .get(auth(Features.getReference), adminV2Controller.getAllQuestionsReference);

// router.route('/search').get(adminV2Controller.getQuestionsByTaggingIdOrTitle);

export default router;
