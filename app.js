import express from "express";
import router from "./routes/routes.js";

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//register routes
app.use("/", router);

export default app;
