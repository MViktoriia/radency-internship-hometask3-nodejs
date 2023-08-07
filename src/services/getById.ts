import { NextFunction, Request, Response } from "express";
import HttpError from "../helpers/httpError";
import {getNoteById} from "../repositories/notes";

const getById = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const result = await getNoteById(id);
        if (!result) {
            throw HttpError(404, "Not found");
          }
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};

export default getById;