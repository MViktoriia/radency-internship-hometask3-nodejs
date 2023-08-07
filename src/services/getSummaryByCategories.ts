import { NextFunction, Request, Response } from "express";
import {getNotesAggregatedData} from "../repositories/notes";

const getSummaryByCategories = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getNotesAggregatedData();
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}

export default getSummaryByCategories;