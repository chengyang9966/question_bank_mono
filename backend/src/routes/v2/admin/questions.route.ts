import express from 'express';
import { questionsValidation } from '../../../validations';
import validate from '../../../middlewares/validate';
import { adminV2Controller } from '../../../controllers/v2';
import uploadImageMiddleware from '../../../middlewares/uploadImageMiddleware';
import auth from '../../../middlewares/auth';
import { Features } from '../../../config/roles';

const router = express.Router();

router
  .route('/')
  .post(
    auth(Features.createQuestions),
    validate(questionsValidation.createQuestions),
    adminV2Controller.createQuestions
  )
  //   .put(
  //     validate(questionsValidation.updateQuestions),
  //     adminController.updateQuestionsAnswersByQuestionId
  //   )
  .get(adminV2Controller.getAllQuestions);

router
  .route('/uploadFiles')
  .post(
    auth(Features.uploadQuestionsWithTaggingAndAnswer),
    uploadImageMiddleware,
    adminV2Controller.uploadQuestionsWithTaggingAndAnswer
  );
export default router;
