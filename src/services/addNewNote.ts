import { NextFunction, Request, Response } from "express";
import { addNote } from "repositories/notes";
import { addNoteSchema } from "schemas/notesSchemas";
import { ValidationError } from 'yup';



export const addNewNote = async(req: Request, res: Response, next: NextFunction) => {
    try {

        const validateResult = await addNoteSchema.validate(req.body);
        
        const result = await addNote(validateResult);
        res.status(201).json(result);    
        
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400);
            res.json(error.message);
        }
       
        next(error);
    }    

}