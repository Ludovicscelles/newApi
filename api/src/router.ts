import express from "express";
import { Request, Response } from "express";

const router = express.Router();

router.get("/", (_: Request, res: Response) => {
  res.send("Hello World");
});

export default router;
