import express from "express";
import { Request, Response } from "express";
import repoControllers from "./repos/repos.controller";
import langControllers from "./langs/langs.controller";
import statusControllers from "./status/status.controller";

const router = express.Router();

router.get("/", (_: Request, res: Response) => {
  res.send("Hello World");
});

router.use("/repos", repoControllers);

router.use("/langs", langControllers);

router.use("/status", statusControllers);

export default router;
