import express, { NextFunction, Request, Response } from "express";
import repos from "../../data/repo.json";
import type { Repo } from "./repos.type";
import Joi from "joi";

let myRepos: Repo[] = repos;
const repoControllers = express.Router();

const schema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  url: Joi.string().required(),
  isPrivate: Joi.number().min(1).max(2).required(),
  isFork: Joi.number().min(1).max(2).required(),
});

const validateRepo = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);

  if (error === null) {
    next();
  } else {
    res.status(422).json(error);
  }
};

repoControllers.get("/", (req: Request, res: Response) => {
  const { status } = req.query;
  const result =
    status !== undefined
      ? myRepos.filter((repo: Repo) => repo.isPrivate === +status)
      : myRepos;
  res.status(200).json(result);
});

repoControllers.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const repo: Repo = myRepos.find((rep) => rep.id === id) as Repo;
  if (repo) {
    res.status(200).json(repo);
  } else {
    res.status(404).json({ message: "Repo not found" });
  }
});

repoControllers.post("/", validateRepo, (req: Request, res: Response) => {
  const repo: Repo = req.body;
  myRepos.push(repo);
  res.status(201).json(repo);
});

repoControllers.put("/:id", validateRepo, (req: Request, res: Response) => {
  const { id } = req.params;
  const repo: Repo = myRepos.find((rep) => rep.id === id) as Repo;
  const updatedRepo = req.body;
  if (repo) {
    myRepos = myRepos.map((rep) => (rep.id === id ? updatedRepo : rep));
    res.status(200).json(updatedRepo);
  } else {
    res.status(404).json({ message: "Repo not found" });
  }
});

repoControllers.delete("/:id", (req: Request, res: Response) => {
  myRepos = myRepos.filter((repo: Repo) => repo.id !== req.params.id);
  res.sendStatus(204);
});

export default repoControllers;
