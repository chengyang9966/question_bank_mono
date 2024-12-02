import express from 'express';
import validate from '../../middlewares/validate';
import { publicUserValidation } from '../../validations';
import { publicUserController } from '../../controllers';

const router = express.Router();
router
  .route('/')
  .post(validate(publicUserValidation.createPublicUser), publicUserController.createPublicUser)
  .get(validate(publicUserValidation.getPublicUsers), publicUserController.getPubicUsers);

router
  .route('/:userId')
  .get(validate(publicUserValidation.getPublicUser), publicUserController.getPublicUser);
export default router;
