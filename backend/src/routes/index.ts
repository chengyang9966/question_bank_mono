import routeV1 from './v1';
import routeV2 from './v2';
import express from 'express';

const router = express.Router();

router.use(routeV1);
router.use('/api/v2', routeV2);

export default router;
