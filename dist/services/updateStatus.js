"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpError_1 = __importDefault(require("../helpers/httpError"));
const notes_1 = require("../repositories/notes");
const notesSchemas_1 = require("../schemas/notesSchemas");
const updateArcivedStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = notesSchemas_1.updateArchivedSchema.validate(req.body);
        if (error) {
            throw (0, httpError_1.default)(400, error.message);
        }
        const { id } = req.params;
        const result = yield (0, notes_1.updateNoteStatus)(id, req.body);
        if (!result) {
            throw (0, httpError_1.default)(404, "Not found");
        }
        res.json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.default = updateArcivedStatus;
//# sourceMappingURL=updateStatus.js.map