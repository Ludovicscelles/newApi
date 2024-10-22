import express, { NextFunction, Request, Response } from "express";
import repos from "../../data/repo.json";
import type { Repo } from "./repos.type";
import Joi from "joi";

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

repoControllers.get("/", (_: Request, res: Response) => {
  res.status(200).json(repos);
});

repoControllers.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const repo: Repo = repos.find((rep) => rep.id === id) as Repo;
  if (repo) {
    res.status(200).json(repo);
  } else {
    res.status(404).json({ message: "Repo not found" });
  }
});

repoControllers.post("/", validateRepo, (req: Request, res: Response) => {
  const repo: Repo = req.body;
  repos.push(repo);
  res.status(201).json(repo);
});

export default repoControllers;
