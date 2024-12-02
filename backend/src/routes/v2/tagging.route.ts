import express from 'express';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { taggingV2Controller } from '../../controllers/v2';
import { Features } from '../../config/roles';
import { taggingValidation } from '../../validations';

const router = express.Router();

router
  .route('/:subjectId')
  .get(
    auth(Features.getQuestionsTagging),
    validate(taggingValidation.getTaggingBySubjectId),
    taggingV2Controller.getAllQuestionsTaggingBySubjectId
  );

export default router;
