import express from "express";
import dotenv from "dotenv";
import router from "./router";

// app.get('/maroute, fonction de callback)

dotenv.config();

const app = express();

app.use("/api", router);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
