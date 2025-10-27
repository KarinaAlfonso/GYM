import { Router } from 'express';
import { RoutineController } from '../controllers/routine.controller';
import { containerFactory } from '../../container'; // función que monta repo->service->controller

const router = Router();
const controller = containerFactory().routineController;

router.post('/', controller.create);
router.get('/user/:userId', controller.getByUser);
router.get('/:id', controller.getById);

export default router;
