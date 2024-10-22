import express, { Request, Response } from "express";
import status from "../../data/status.json";
import type { Statut } from "./status.type";

const statusControllers = express.Router();

let myStatus: Statut[] = status;

statusControllers.get("/", (_: Request, res: Response) => {
  res.status(200).json(status);
});

statusControllers.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const statut: Statut = status.find((stat) => stat.id === id) as Statut;
  if (statut) {
    res.status(200).json(myStatus);
  } else {
    res.status(404).json({ message: "Statut not found" });
  }
});

statusControllers.post("/", (req: Request, res: Response) => {
  const statut: Statut = req.body;
  myStatus.push(statut);
  res.status(201).json(myStatus);
});

statusControllers.put("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const statut: Statut = status.find((stat) => stat.id === id) as Statut;
  const updatedStatut = req.body;
  if (statut) {
    myStatus = status.map((stat) => (stat.id === id ? updatedStatut : stat));
    res.status(200).json(updatedStatut);
  } else {
    res.status(404).json({ message: "Statut not found" });
  }
});

export default statusControllers;
