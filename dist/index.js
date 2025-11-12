"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const data_source_1 = require("./infrastructure/database/data_source");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 4002;
data_source_1.AppDataSource.initialize()
    .then(async () => {
    const app = (0, app_1.createApp)();
    app.listen(port, () => {
        console.log(`Routine service listening on ${port}`);
    });
})
    .catch(err => {
    console.error('DB initialization error', err);
});
//# sourceMappingURL=index.js.map