import { NextFunction, Request, Response } from "express";
import { updateNote } from "repositories/notes";
import { addNoteSchema } from "schemas/notesSchemas";
import HttpError from "helpers/httpError";


export const editNote = async(req: Request, res: Response, next: NextFunction) => {
    try {

        const {error} = addNoteSchema.validate(req.body);
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

}