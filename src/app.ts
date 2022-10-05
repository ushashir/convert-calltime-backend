/* eslint-disable quotes */
import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";

import usersRouter from "./routes/userRoute";
import accountRouter from "./routes/accountRoute";
import withdrawHistoryRouter from "./routes/withdrawHistoryRoute";
import walletRouter from "./routes/walletRoute";
import txRoute from "./routes/txRoute";

const app = express();

console.log("app running on port 7000");

app.use(compression());
app.use(cors());
app.use(helmet());
app.use(logger("dev"));
app.use(
  express.json({
    limit: "10mb",
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/account", accountRouter);
app.use("/api/withdraw", withdrawHistoryRouter);
app.use("/api/wallet", walletRouter);
app.use("/api/transactions", txRoute);

app.use("/api/usertxhistory", txRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: createError.HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
  next();
});

export default app;
