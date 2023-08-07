import express, {Express, NextFunction, Request, Response} from "express";
import cors from "cors";
import notesRouter from "./routes/api/notesRoutes";



const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/api", notesRouter);

app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Not found" })
})
  
app.use((error: Error , req: Request, res: Response, next: NextFunction): void => {

    res.status(500).json({ message: error.message });
})


export default app;