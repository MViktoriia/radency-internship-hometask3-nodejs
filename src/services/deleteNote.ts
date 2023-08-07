import { NextFunction, Request, Response } from "express";
import HttpError from "../helpers/httpError";
import { removeNote } from "../repositories/notes";

const deleteNote = async(req:Request, res:Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const result = await removeNote(id);

        if(!result) {
            throw HttpError(404, "Not found");
        }

        res.json({message: "Note deleted"});
        
    } catch (error) {
        next(error);        
    }

};

export default deleteNote;