import express, { Request, Response } from "express";
import langs from "../../data/langs.json";
import type { Lang } from "./langs.type";

const langControllers = express.Router();

let myLangs: Lang[] = langs;

langControllers.get("/", (_: Request, res: Response) => {
  res.status(200).json(myLangs);
});

langControllers.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const lang: Lang = myLangs.find((lang) => lang.id === id) as Lang;
  if (lang) {
    res.status(200).json(lang);
  } else {
    res.status(404).json({ message: "Lang not found" });
  }
});

langControllers.post("/", (req: Request, res: Response) => {
  const lang: Lang = req.body;
  myLangs.push(lang);
  res.status(201).json(lang);
});

langControllers.put("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const lang: Lang = myLangs.find((lang) => lang.id === id) as Lang;
  const updatedLang = req.body;
  if (lang) {
    myLangs = myLangs.map((lang) => (lang.id === id ? updatedLang : lang));
    res.status(200).json(updatedLang);
  } else {
    res.status(404).json({ message: "Lang not found" });
  }
});

langControllers.delete("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const lang: Lang = myLangs.find((lang) => lang.id === id) as Lang;
  if (lang) {
    myLangs = myLangs.filter((lang) => lang.id !== id);
    res.status(200).json(lang);
  } else {
    res.status(404).json({ message: "Lang not found" });
  }
});

export default langControllers;
