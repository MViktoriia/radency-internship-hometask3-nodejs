"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateArchivedSchema = exports.addNoteSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const regexCreated = /(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/;
exports.addNoteSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    created: joi_1.default.string().required().pattern(regexCreated, "yyyy-mm-dd"),
    category: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
    archived: joi_1.default.boolean(),
});
exports.updateArchivedSchema = joi_1.default.object({
    archived: joi_1.default.boolean().required(),
});
//# sourceMappingURL=notesSchemas.js.map