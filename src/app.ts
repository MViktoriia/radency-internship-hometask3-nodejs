import express, {Express, Request, Response} from "express";
import cors from "cors";
import notesRouter from "./routes/api/notesRoutes";
import { ErrorWithStatus } from "helpers/httpError";



const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/", notesRouter);

app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Not found" })
})
  
app.use((error: ErrorWithStatus , req: Request, res: Response): void => {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({ message });
})


export default app;