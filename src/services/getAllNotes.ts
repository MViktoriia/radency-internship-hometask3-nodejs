import { NextFunction, Request, Response } from "express";
import {allNotes} from "repositories/notes";

export const getAllNotes = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await allNotes();
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}