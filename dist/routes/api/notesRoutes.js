"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addNewNote_1 = __importDefault(require("../../services/addNewNote"));
const deleteNote_1 = __importDefault(require("../../services/deleteNote"));
const editNote_1 = __importDefault(require("../../services/editNote"));
const getAllNotes_1 = __importDefault(require("../../services/getAllNotes"));
const getById_1 = __importDefault(require("../../services/getById"));
const getSummaryByCategories_1 = __importDefault(require("../../services/getSummaryByCategories"));
const updateStatus_1 = __importDefault(require("../../services/updateStatus"));
const router = express_1.default.Router();
router.get("/notes", getAllNotes_1.default);
router.get("/notes/stats", getSummaryByCategories_1.default);
router.get("/notes/:id", getById_1.default);
router.post("/notes", addNewNote_1.default);
router.patch("/notes/:id", editNote_1.default);
router.put("/notes/:id/archived", updateStatus_1.default);
router.delete("/notes/:id", deleteNote_1.default);
exports.default = router;
//# sourceMappingURL=notesRoutes.js.map