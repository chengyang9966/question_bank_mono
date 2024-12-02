import express from 'express';
import { questionsValidation } from '../../../validations';
import validate from '../../../middlewares/validate';
import { adminV2Controller } from '../../../controllers/v2';

const router = express.Router();

router
  .route('/')
  .post(validate(questionsValidation.createQuestions), adminV2Controller.createQuestions)
  //   .put(
  //     validate(questionsValidation.updateQuestions),
  //     adminController.updateQuestionsAnswersByQuestionId
  //   )
  .get(adminV2Controller.getAllQuestions);

export default router;
