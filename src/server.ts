import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import path from "path";

import cookieParser from "cookie-parser";

import { router } from "./routes";

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use(router);

app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.get("/", (req, res) => res.send("🚀 API online 🚀 "));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error.",
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app
