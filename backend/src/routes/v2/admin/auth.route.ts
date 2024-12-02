import express from 'express';
import validate from '../../../middlewares/validate';
import { authValidation } from '../../../validations';
import { adminV2Controller } from '../../../controllers/v2';

const router = express.Router();

router.post('/register', validate(authValidation.register), adminV2Controller.registerAdmin);

export default router;
