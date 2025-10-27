import { Router } from 'express';
import { containerFactory } from '../../container'; // crea dependencias
const router = Router();

const { exerciseController } = containerFactory();

router.post('/', exerciseController.create);
router.get('/', exerciseController.getAll);
router.get('/:id', exerciseController.getById);
router.put('/:id', exerciseController.update);
router.delete('/:id', exerciseController.delete);

export default router;
