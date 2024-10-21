import express, { Request, Response } from "express";
import status from "../../data/status.json";
import type { Statut } from "./status.type";

const statusControllers = express.Router();

statusControllers.get("/", (_: Request, res: Response) => {
  res.status(200).json(status);
});

statusControllers.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const statut: Statut = status.find((stat) => stat.id === id) as Statut;
  if (statut) {
    res.status(200).json(statut);
  } else {
    res.status(404).json({ message: "Statut not found" });
  }
});

statusControllers.post("/", (req: Request, res: Response) => {
  const statut: Statut = req.body;
  status.push(statut);
  res.status(201).json(statut);
});

export default statusControllers;
