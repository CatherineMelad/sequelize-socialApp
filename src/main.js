import express from "express";
import { PORT } from "./config/config.service.js";
import { dbConnection } from "./db/connections.js";
import { userRouter, postRouter, commentRouter } from "./modules/index.js";

const app = express();

app.use(express.json());

await dbConnection();

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);


app.use((err, req, res, next) => {
  res.status(err.cause || 500).json({
    message: err.message || "Internal Server Error",
    stack: err.stack,
    error: err,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
