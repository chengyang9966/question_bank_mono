import express from 'express';
import validate from '../../../middlewares/validate';
import { questionsValidation } from '../../../validations';
import { adminController } from '../../../controllers';
import { upload } from '../../../config/multer';
import uploadImageMiddleware from '../../../middlewares/uploadImageMiddleware';

const router = express.Router();

router
  .route('/')
  .post(validate(questionsValidation.createReferences), adminController.createQuestionsReference)
  .get(adminController.getAllReferences);

router
  .route('/:questionId')
  .get(validate(questionsValidation.getReferencesById), adminController.getReferencesByQuestionId)
  .put(validate(questionsValidation.updateReferences), adminController.updateQuestionsReference);

router.route('/uploadFiles').post(
  uploadImageMiddleware,
  validate(questionsValidation.uploadReferences),
  (req, res, next) => {
    res.locals.filePath = req.body.questionId;
    next();
  },
  adminController.uploadFileReferences
);
export default router;
