import { NextFunction, Request, Response } from "express";
import { updateNote } from "repositories/notes";
import { addNoteSchema } from "schemas/notesSchemas";
import { ValidationError } from "yup";
import HttpError from "helpers/httpError";


export const editNote = async(req: Request, res: Response, next: NextFunction) => {
    try {

        const validateResult = await addNoteSchema.validate(req.body);

        const {id} = req.params;
        
        const result = await updateNote(id, validateResult);

        if (!result) {
            throw HttpError(404, "Not found");
        }

        res.json(result);    
        
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400);
            res.json(error.message);
        }
        next(error);
    }    

}