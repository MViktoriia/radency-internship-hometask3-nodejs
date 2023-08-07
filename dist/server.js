"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const colors_1 = require("colors");
const port = 5500;
app_1.default.listen(port, () => {
    console.log((0, colors_1.cyan)(`Server is running on port ${port}`));
});
//# sourceMappingURL=server.js.map