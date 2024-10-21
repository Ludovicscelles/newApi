import express, { Request, Response } from "express";
import repos from "../../data/repo.json";

const repoControllers = express.Router();

repoControllers.get("/", (_: Request, res: Response) => {
  res.status(200).json(repos);
});

repoControllers.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const repo = repos.find((rep) => rep.id === id);
  if (repo) {
    res.status(200).json(repo);
  } else {
    res.status(404).json({ message: "Repo not found" });
  }
});

export default repoControllers;
