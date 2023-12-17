import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import createHttpError from "http-errors";
import {
  blogRoutes,
  commentRoutes,
  notificationRoutes,
  userRoutes,
} from "./routes";
import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json" ;

require("dotenv").config();

const app: Application = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

// Enable Cors
app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Apply Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Home Route -GET
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is on running...",
  });
});

app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);

app.use("*", async (req: Request, res: Response, next: NextFunction) => {
  next(createHttpError.NotFound());
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
};

app.use(errorHandler);

export default app;
