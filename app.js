import express from "express";
import { configDotenv } from "dotenv";
import AdminRouter from "./routes/admin.routes.js";
import TrainersRouter from "./routes/trainees.routes.js";
import TraineesRouter from "./routes/trainees.routes.js";
import AuthRouter from "./routes/auth.routes.js";
import { connectDB } from "./configs/dbConfig.js";
import cors from "cors";

configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;
await connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", AuthRouter)
app.use("/admin", AdminRouter);
app.use("/trainers", TrainersRouter);
app.use("/trainees", TraineesRouter);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome to training management application" });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
