import { NextFunction, Request, Response } from "express";
import HttpError from "helpers/httpError";
import { updateNoteStatus } from "repositories/notes";
import { updateArchivedSchema } from "schemas/notesSchemas";



export const updateArcivedStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const {error} = updateArchivedSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }

        const {id} = req.params;
        
        const result = await updateNoteStatus(id, req.body);

        if (!result) {
            throw HttpError(404, "Not found");
        }

        res.json(result);    
        
    } catch (error) {
        
        next(error);
    }    
};
  
