import express, {Express, NextFunction, Request, Response} from "express";
import  {addNewNote, deleteNote, editNote, getAllNotes, getById, getSummaryByCategories, updateArcivedStatus }  from "services";


const router = express.Router();


router.get("/notes", getAllNotes);
router.get("/notes/stats", getSummaryByCategories);
router.get("/notes/:id", getById);
router.post("/notes", addNewNote);
router.patch("/notes/:id", editNote);
router.put("/notes/:id/archived", updateArcivedStatus);
router.delete("/notes/:id", deleteNote);


export default router;