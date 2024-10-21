import express, { Request, Response } from "express";
import langs from "../../data/langs.json";
import type { Lang } from "./langs.type";

const langControllers = express.Router();

langControllers.get("/", (_: Request, res: Response) => {
  res.status(200).json(langs);
});

langControllers.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const lang: Lang = langs.find((lang) => lang.id === id) as Lang;
  if (lang) {
    res.status(200).json(lang);
  } else {
    res.status(404).json({ message: "Lang not found" });
  }
});

export default langControllers;
