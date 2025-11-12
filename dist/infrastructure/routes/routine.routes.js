"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const container_1 = require("../../container"); // función que monta repo->service->controller
const router = (0, express_1.Router)();
const controller = (0, container_1.containerFactory)().routineController;
router.post('/', controller.create);
router.get('/user/:userId', controller.getByUser);
router.get('/:id', controller.getById);
exports.default = router;
//# sourceMappingURL=routine.routes.js.map