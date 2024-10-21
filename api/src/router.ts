import express from "express";
import { Request, Response } from "express";
import repoControllers from "./repos/repos.controller";
import langControllers from "./langs/langs.controller";

const router = express.Router();

router.get("/", (_: Request, res: Response) => {
  res.send("Hello World");
});

router.use("/repos", repoControllers);

router.use("/langs", langControllers);

export default router;
