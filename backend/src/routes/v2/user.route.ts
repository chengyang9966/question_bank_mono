import express from 'express';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { userValidation } from '../../validations';
import { userController } from '../../controllers';
import { Features } from '../../config/roles';

const router = express.Router();

router
  .route('/')
  .post(auth(Features.manageUsers), validate(userValidation.createUser), userController.createUser)
  .get(auth(Features.getUsers), validate(userValidation.getUsers), userController.getUsers);

router
  .route('/:userId')
  .get(auth(Features.getUsers), validate(userValidation.getUser), userController.getUser)
  .patch(auth(Features.manageUsers), validate(userValidation.updateUser), userController.updateUser)
  .delete(
    auth(Features.manageUsers),
    validate(userValidation.deleteUser),
    userController.deleteUser
  );

export default router;
