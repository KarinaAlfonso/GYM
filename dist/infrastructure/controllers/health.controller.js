"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
class HealthController {
    check(req, res) {
        res.json({ status: 'ok', service: 'routine-service', timestamp: new Date() });
    }
}
exports.HealthController = HealthController;
//# sourceMappingURL=health.controller.js.map