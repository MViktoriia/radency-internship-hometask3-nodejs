import { NextFunction, Request, Response } from "express";
import { updateNote } from "../repositories/notes";
import { updateNoteSchema } from "../schemas/notesSchemas";
import HttpError from "../helpers/httpError";


const editNote = async(req: Request, res: Response, next: NextFunction) => {
    try {

        const {error} = updateNoteSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }

        const {id} = req.params;
        
        const result = await updateNote(id, req.body);

        if (!result) {
            throw HttpError(404, "Not found");
        }

        res.json(result);    
        
    } catch (error) {
        next(error);
    }    

};

export default editNote;