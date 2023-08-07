import express from "express";
import addNewNote from "../../services/addNewNote";
import deleteNote from "../../services/deleteNote";
import editNote from "../../services/editNote";
import getAllNotes from "../../services/getAllNotes";
import getById from "../../services/getById";
import getSummaryByCategories from "../../services/getSummaryByCategories";
import updateArcivedStatus from "../../services/updateStatus";



const router = express.Router();


router.get("/notes", getAllNotes);
router.get("/notes/stats", getSummaryByCategories);
router.get("/notes/:id", getById);
router.post("/notes", addNewNote);
router.patch("/notes/:id", editNote);
router.put("/notes/:id/archived", updateArcivedStatus);
router.delete("/notes/:id", deleteNote);


export default router;