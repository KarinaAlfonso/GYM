"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const container_1 = require("../../container"); // crea dependencias
const router = (0, express_1.Router)();
const { exerciseController } = (0, container_1.containerFactory)();
router.post('/', exerciseController.create);
router.get('/', exerciseController.getAll);
router.get('/:id', exerciseController.getById);
router.put('/:id', exerciseController.update);
router.delete('/:id', exerciseController.delete);
exports.default = router;
//# sourceMappingURL=exercise.routes.js.map