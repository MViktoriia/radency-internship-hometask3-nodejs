import { NextFunction, Request, Response } from "express";
import HttpError from "helpers/httpError";
import { addNote } from "repositories/notes";
import { addNoteSchema } from "schemas/notesSchemas";




export const addNewNote = async(req: Request, res: Response, next: NextFunction) => {
    try {

        const {error} = addNoteSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
        
        const result = await addNote(req.body);
        res.status(201).json(result);    
        
    } catch (error) {
       
        next(error);
    }    

}